const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isWin = process.platform === 'win32';
const npxCmd = isWin ? 'npx.cmd' : 'npx';
const rootDir = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function logHeader(title) {
  console.log(`\n${colors.bright}${colors.cyan}══════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}▶ ${title}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}══════════════════════════════════════════════════════════════════${colors.reset}`);
}

function logPass(msg) {
  console.log(`${colors.green}✔ [PASS]${colors.reset} ${msg}`);
}

function logFail(msg) {
  console.error(`${colors.red}✖ [FAIL]${colors.reset} ${msg}`);
}

function runCommand(command, inheritStdio = false) {
  try {
    console.log(`${colors.dim}Executing: ${command}${colors.reset}`);
    if (inheritStdio) {
      execSync(command, {
        cwd: rootDir,
        stdio: 'inherit',
      });
      return { success: true, stdout: '' };
    }
    const stdout = execSync(command, {
      cwd: rootDir,
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return { success: true, stdout };
  } catch (error) {
    return {
      success: false,
      stdout: error.stdout ? error.stdout.toString() : '',
      stderr: error.stderr ? error.stderr.toString() : error.message,
    };
  }
}

// -------------------------------------------------------------
// PASS 0.5: Pre-Commit Secret Scanner
// -------------------------------------------------------------
function pass05SecretScanner() {
  logHeader('Pass 0.5: Pre-Commit Secret Scanner');

  const secretPatterns = [
    { name: 'AWS Access Key', regex: new RegExp('AKIA' + '[0-9A-Z]{16}') },
    { name: 'RSA Private Key', regex: new RegExp('-----' + 'BEGIN RSA PRIVATE KEY' + '-----') },
    { name: 'Generic Private Key', regex: new RegExp('-----' + 'BEGIN PRIVATE KEY' + '-----') },
    { name: 'GitHub Personal Token', regex: new RegExp('ghp_' + '[0-9a-zA-Z]{36}') },
    { name: 'Generic Secret Token', regex: new RegExp('(api_key|apikey|secret_key|client_secret)\\s*[:=]\\s*[\'"][0-9a-zA-Z-_]{20,}[\'"]', 'i') },
  ];

  const scannedFiles = [];
  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (['node_modules', '.git', '.next', 'coverage'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(ts|tsx|js|json|md|env)$/.test(file)) {
        // Don't scan the verify-build script itself for its own pattern definitions
        if (fullPath !== __filename) {
          scannedFiles.push(fullPath);
        }
      }
    }
  }

  scanDir(rootDir);

  const violations = [];
  for (const filePath of scannedFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const pattern of secretPatterns) {
      if (pattern.regex.test(content)) {
        violations.push({ file: path.relative(rootDir, filePath), issue: pattern.name });
      }
    }
  }

  if (violations.length > 0) {
    logFail(`Secret leakage detected in ${violations.length} location(s):`);
    violations.forEach((v) => console.error(`  - ${v.file}: ${v.issue}`));
    return false;
  }

  logPass(`Scanned ${scannedFiles.length} files. Zero secrets or credentials detected.`);
  return true;
}

// -------------------------------------------------------------
// PASS 1: TypeScript Strict Typecheck
// -------------------------------------------------------------
function pass1Typecheck() {
  logHeader('Pass 1: TypeScript Strict Typecheck');
  const result = runCommand(`${npxCmd} tsc --noEmit`);
  if (!result.success) {
    logFail('TypeScript compilation failed with errors:');
    console.error(result.stderr || result.stdout);
    return false;
  }
  logPass('TypeScript strict typecheck completed with 0 errors.');
  return true;
}

// -------------------------------------------------------------
// PASS 2 & 3: Vitest Test Execution & Coverage Audit
// -------------------------------------------------------------
function pass2And3VitestTestsAndCoverage() {
  logHeader('Pass 2 & 3: Vitest MSW & UI Test Execution + Coverage Verification');
  
  const result = runCommand(
    `${npxCmd} vitest run --coverage`,
    true
  );

  if (!result.success) {
    logFail('Vitest tests failed.');
    return false;
  }

  // Print detailed test execution breakdown from test-results.json
  const testResultsPath = path.join(rootDir, 'docs/test-results.json');
  if (fs.existsSync(testResultsPath)) {
    try {
      const testReport = JSON.parse(fs.readFileSync(testResultsPath, 'utf-8'));
      if (Array.isArray(testReport.testResults)) {
        testReport.testResults.forEach((suite) => {
          const relPath = path.relative(rootDir, suite.name).replace(/\\/g, '/');
          const passedCount = (suite.assertionResults || []).filter((r) => r.status === 'passed').length;
          const totalCount = (suite.assertionResults || []).length;
          console.log(`  ${colors.green}✓${colors.reset} ${colors.dim}${relPath}${colors.reset} (${colors.bright}${passedCount}/${totalCount} passed${colors.reset})`);
        });
        console.log(`  ${colors.green}${colors.bright}Summary: ${testReport.numPassedTestSuites}/${testReport.numTotalTestSuites} files passed | ${testReport.numPassedTests}/${testReport.numTotalTests} tests passed${colors.reset}`);
      }
    } catch (e) {
      // Fallback silently if json read fails
    }
  }

  const coveragePath = path.join(rootDir, 'coverage/coverage-summary.json');
  if (!fs.existsSync(coveragePath)) {
    logFail('Coverage summary file not found at coverage/coverage-summary.json');
    return false;
  }

  const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
  const total = coverageData.total || {};

  const lines = total.lines?.pct ?? 0;
  const statements = total.statements?.pct ?? 0;
  const functions = total.functions?.pct ?? 0;
  const branches = total.branches?.pct ?? 0;

  console.log(`[Coverage Metrics] Lines: ${lines}%, Statements: ${statements}%, Functions: ${functions}%, Branches: ${branches}%`);

  const threshold = 85.0;
  if (lines < threshold || statements < threshold || functions < threshold || branches < threshold) {
    logFail(`Code coverage is below the required ${threshold}% SLA threshold.`);
    return false;
  }

  logPass(`Vitest test suite passed with 100% success rate and >= ${threshold}% code coverage.`);
  return true;
}

// -------------------------------------------------------------
// PASS 4: Living Architecture & Quality Report Auto-Sync
// -------------------------------------------------------------
function pass4LivingDocsSync() {
  logHeader('Pass 4: Living Architecture & Quality Report Auto-Sync');
  try {
    const { generateArchitectureMatrix } = require('./generate-architecture-matrix');
    const { generateQualityReport } = require('./generate-quality-report');
    const { generateChangelog } = require('./generate-changelog');

    generateArchitectureMatrix();
    generateQualityReport();
    generateChangelog();

    logPass('Auto-synced ARCHITECTURE.md, docs/QUALITY_AUDIT_REPORT.md, and CHANGELOG.md.');
    return true;
  } catch (error) {
    logFail(`Living documentation sync failed: ${error.message}`);
    return false;
  }
}

// -------------------------------------------------------------
// PASS 5: ADR Decision Ledger Validation
// -------------------------------------------------------------
function pass5ADRValidation() {
  logHeader('Pass 5: Architecture Decision Record (ADR) Validation');
  const decisionsPath = path.join(rootDir, 'docs/DECISIONS.md');
  if (!fs.existsSync(decisionsPath)) {
    logFail('docs/DECISIONS.md does not exist.');
    return false;
  }

  const content = fs.readFileSync(decisionsPath, 'utf-8');
  const adrMatches = [...content.matchAll(/## (ADR-\d+):/g)];

  if (adrMatches.length === 0) {
    logFail('No ADR entries found in docs/DECISIONS.md.');
    return false;
  }

  let expectedNumber = 1;
  for (const match of adrMatches) {
    const adrId = match[1];
    const num = parseInt(adrId.replace('ADR-', ''), 10);
    if (num !== expectedNumber) {
      logFail(`ADR numbering sequence violation: Expected ADR-${String(expectedNumber).padStart(3, '0')}, found ${adrId}`);
      return false;
    }
    expectedNumber++;
  }

  const requiredSections = ['Status', 'Date', 'Context', 'Decision', 'Consequences'];
  for (const section of requiredSections) {
    if (!content.includes(section)) {
      logFail(`ADR document is missing required section: "${section}"`);
      return false;
    }
  }

  logPass(`Validated ${adrMatches.length} ADR entries with sequential numbering and schema conformance.`);
  return true;
}

// -------------------------------------------------------------
// PASS 6: ESLint & Knip Dead-Code Audit
// -------------------------------------------------------------
function pass6LintAndKnipAudit() {
  logHeader('Pass 6: ESLint & Knip Dead-Code Audit');
  
  // 1. ESLint
  const lintResult = runCommand(`${npxCmd} eslint`);
  if (!lintResult.success) {
    logFail('ESLint reported issues:');
    console.error(lintResult.stdout);
    console.error(lintResult.stderr);
    return false;
  }
  logPass('ESLint passed with 0 errors.');

  // 2. Dead Code Audit (Knip with AST Fallback)
  const knipResult = runCommand(`${npxCmd} knip`);
  if (knipResult.success) {
    logPass('Knip dead-code audit passed with 0 unused files/exports.');
  } else if (knipResult.stderr && knipResult.stderr.includes('Application Control policy')) {
    console.log(`${colors.yellow}ℹ [Note] Native Knip binary restricted by OS policy. Executing AST Dead-Code Engine...${colors.reset}`);
    const { ASTParser } = require('./lib/ast-parser');
    const parser = new ASTParser();
    const deadCodeResult = parser.auditDeadCode();
    if (!deadCodeResult.isClean) {
      logFail(`AST Dead-Code Audit found unused files: ${deadCodeResult.unusedFiles.join(', ')}`);
      return false;
    }
    logPass('AST Dead-Code Engine verified 0 unused files/modules.');
  } else if (!knipResult.success) {
    // If knip failed with actual unused code
    logFail('Dead-code audit reported issues:');
    console.error(knipResult.stdout || knipResult.stderr);
    return false;
  }

  return true;
}

// -------------------------------------------------------------
// PASS 7: Production Build Compilation
// -------------------------------------------------------------
function pass7ProductionBuild() {
  logHeader('Pass 7: Production Build Compilation');
  const buildResult = runCommand(`${npxCmd} next build`);
  if (!buildResult.success) {
    logFail('Production Next.js build compilation failed:');
    console.error(buildResult.stdout);
    console.error(buildResult.stderr);
    return false;
  }
  logPass('Production build compiled successfully.');
  return true;
}

// -------------------------------------------------------------
// Master Orchestrator
// -------------------------------------------------------------
function runVerificationEngine() {
  const startTime = Date.now();
  console.log(`\n${colors.bright}${colors.magenta}==================================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}🚀 7-GATEWAY CLOSED-LOOP QUALITY VERIFICATION ENGINE${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}==================================================================${colors.reset}`);

  const passes = [
    { name: 'Pass 0.5: Secret Scanner', fn: pass05SecretScanner },
    { name: 'Pass 1: TypeScript Strict Typecheck', fn: pass1Typecheck },
    { name: 'Pass 2 & 3: Vitest Tests & Coverage', fn: pass2And3VitestTestsAndCoverage },
    { name: 'Pass 4: Living Docs Sync', fn: pass4LivingDocsSync },
    { name: 'Pass 5: ADR Ledger Validation', fn: pass5ADRValidation },
    { name: 'Pass 6: ESLint & Dead-Code Audit', fn: pass6LintAndKnipAudit },
    { name: 'Pass 7: Production Build', fn: pass7ProductionBuild },
  ];

  for (const pass of passes) {
    const passed = pass.fn();
    if (!passed) {
      console.log(`\n${colors.bright}${colors.red}==================================================================${colors.reset}`);
      console.log(`${colors.bright}${colors.red}❌ VERIFICATION ENGINE HALTED AT: ${pass.name}${colors.reset}`);
      console.log(`${colors.bright}${colors.red}==================================================================${colors.reset}\n`);
      process.exit(1);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n${colors.bright}${colors.green}==================================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.green}✨ ALL 7 QUALITY GATEWAYS PASSED SUCCESSFULLY (${duration}s)${colors.reset}`);
  console.log(`${colors.bright}${colors.green}==================================================================${colors.reset}\n`);
}

if (require.main === module) {
  runVerificationEngine();
}

module.exports = { runVerificationEngine };
