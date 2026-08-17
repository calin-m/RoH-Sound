import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    slowTestThreshold: 1000,
    setupFiles: [path.resolve(__dirname, 'src/test/setup.ts')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    server: {
      deps: {
        inline: [/msw/],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'lcov', 'html'],
      reportsDirectory: path.resolve(__dirname, 'coverage'),
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/test/**',
        'src/mocks/**',
        'src/app/layout.tsx',
        'src/app/providers.tsx',
        'src/app/globals.css',
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
    reporters: ['default', 'json'],
    outputFile: {
      json: path.resolve(__dirname, 'docs/test-results.json'),
    },
  },
});
