#!/usr/bin/env node
/**
 * Antigravity PreToolUse Approval Gate Hook
 * Programmatically forces explicit user confirmation on every file modification.
 */

let inputData = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  let toolName = 'file modification';
  let targetFile = '';

  try {
    if (inputData.trim()) {
      const payload = JSON.parse(inputData);
      if (payload?.toolCall?.name) {
        toolName = payload.toolCall.name;
      }
      if (payload?.toolCall?.args?.TargetFile) {
        targetFile = ` on ${payload.toolCall.args.TargetFile}`;
      }
    }
  } catch {
    // Non-blocking JSON parse fallback
  }

  const response = {
    decision: 'force_ask',
    reason: `Explicit user confirmation is required before executing ${toolName}${targetFile}.`,
  };

  process.stdout.write(JSON.stringify(response));
});
