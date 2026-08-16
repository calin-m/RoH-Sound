const fs = require('fs');
const path = require('path');
const ts = require('typescript');

/**
 * Enterprise AST Parser inspecting TypeScript / React files
 */
class ASTParser {
  constructor(srcDir = path.resolve(__dirname, '../../src')) {
    this.srcDir = srcDir;
  }

  getAllSourceFiles(dir = this.srcDir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          this.getAllSourceFiles(fullPath, fileList);
        }
      } else if (/\.(ts|tsx)$/.test(file) && !file.endsWith('.d.ts')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  parseFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    return ts.createSourceFile(
      filePath,
      code,
      ts.ScriptTarget.Latest,
      true,
      filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );
  }

  extractImports(sourceFile) {
    const imports = [];
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier.text;
        const namedImports = [];
        let defaultImport = null;

        if (node.importClause) {
          if (node.importClause.name) {
            defaultImport = node.importClause.name.text;
          }
          if (
            node.importClause.namedBindings &&
            ts.isNamedImports(node.importClause.namedBindings)
          ) {
            node.importClause.namedBindings.elements.forEach((el) => {
              namedImports.push(el.name.text);
            });
          }
        }

        imports.push({
          module: moduleSpecifier,
          defaultImport,
          namedImports,
        });
      }
    });
    return imports;
  }

  extractExports(sourceFile) {
    const exports = [];
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isVariableStatement(node)) {
        const isExported = node.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.ExportKeyword
        );
        if (isExported) {
          node.declarationList.declarations.forEach((decl) => {
            if (decl.name && ts.isIdentifier(decl.name)) {
              exports.push({ name: decl.name.text, type: 'variable' });
            }
          });
        }
      } else if (ts.isFunctionDeclaration(node)) {
        const isExported = node.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.ExportKeyword
        );
        const isDefault = node.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.DefaultKeyword
        );
        if (isExported && node.name) {
          exports.push({
            name: node.name.text,
            type: isDefault ? 'defaultFunction' : 'function',
          });
        }
      }
    });
    return exports;
  }

  inspectProject() {
    const allFiles = this.getAllSourceFiles();
    const result = {
      routes: [],
      stores: [],
      queries: [],
      uiComponents: [],
      mocks: [],
      tests: [],
      dependencyGraph: {},
      summary: {
        totalFiles: allFiles.length,
        totalRoutes: 0,
        totalStores: 0,
        totalQueries: 0,
        totalUIComponents: 0,
      },
    };

    for (const filePath of allFiles) {
      const relativePath = path.relative(path.resolve(this.srcDir, '..'), filePath).replace(/\\/g, '/');
      const isTestFile = /\.test\.(ts|tsx)$/.test(relativePath);
      const sourceFile = this.parseFile(filePath);
      const imports = this.extractImports(sourceFile);
      const exports = this.extractExports(sourceFile);

      result.dependencyGraph[relativePath] = {
        imports,
        exports,
      };

      if (isTestFile) {
        result.tests.push({
          file: relativePath,
          exports: exports.map((e) => e.name),
        });
        continue;
      }

      // Routes: src/app/**/page.tsx or layout.tsx or route.ts
      if (relativePath.includes('src/app/') && (relativePath.endsWith('page.tsx') || relativePath.endsWith('layout.tsx'))) {
        const routePath = relativePath
          .replace('src/app', '')
          .replace('/page.tsx', '')
          .replace('/layout.tsx', '') || '/';

        result.routes.push({
          route: routePath,
          file: relativePath,
          isLayout: relativePath.endsWith('layout.tsx'),
          exports: exports.map((e) => e.name),
          imports: imports.map((i) => i.module),
        });
      }

      // Zustand Stores
      if (relativePath.includes('src/stores/')) {
        result.stores.push({
          file: relativePath,
          exports: exports.map((e) => e.name),
          imports: imports.map((i) => i.module),
        });
      }

      // Queries
      if (relativePath.includes('src/hooks/queries/')) {
        result.queries.push({
          file: relativePath,
          exports: exports.map((e) => e.name),
          imports: imports.map((i) => i.module),
        });
      }

      // UI Components
      if (relativePath.includes('src/components/ui/')) {
        result.uiComponents.push({
          file: relativePath,
          exports: exports.map((e) => e.name),
          imports: imports.map((i) => i.module),
        });
      }

      // Mocks
      if (relativePath.includes('src/mocks/')) {
        result.mocks.push({
          file: relativePath,
          exports: exports.map((e) => e.name),
        });
      }
    }

    result.summary.totalRoutes = result.routes.length;
    result.summary.totalStores = result.stores.length;
    result.summary.totalQueries = result.queries.length;
    result.summary.totalUIComponents = result.uiComponents.length;

    return result;
  }

  auditDeadCode() {
    const inspection = this.inspectProject();
    const allImportedModules = new Set();
    const allImportedSymbols = new Set();

    for (const [file, data] of Object.entries(inspection.dependencyGraph)) {
      for (const imp of data.imports) {
        allImportedModules.add(imp.module);
        if (imp.defaultImport) allImportedSymbols.add(imp.defaultImport);
        for (const named of imp.namedImports) {
          allImportedSymbols.add(named);
        }
      }
    }

    const unusedFiles = [];
    const unusedExports = [];

    for (const [file, data] of Object.entries(inspection.dependencyGraph)) {
      // Entry points and routes are always used
      if (
        file.startsWith('src/app/') ||
        file.endsWith('.test.ts') ||
        file.endsWith('.test.tsx') ||
        file.includes('src/test/') ||
        file.includes('src/mocks/')
      ) {
        continue;
      }

      const aliasPath = '@/' + file.replace('src/', '').replace(/\.(ts|tsx)$/, '');
      const isImported = Array.from(allImportedModules).some(
        (mod) => mod === aliasPath || mod.endsWith(path.basename(file, path.extname(file)))
      );

      if (!isImported) {
        unusedFiles.push(file);
      }
    }

    return {
      unusedFiles,
      unusedExports,
      isClean: unusedFiles.length === 0 && unusedExports.length === 0,
    };
  }
}

module.exports = { ASTParser };
