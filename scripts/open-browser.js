const { exec } = require('child_process');

const url = process.argv[2] || 'http://localhost:3000';
const delayMs = parseInt(process.argv[3] || '1500', 10);

setTimeout(() => {
  const startCmd =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(startCmd, (err) => {
    if (err) {
      // Graceful fallback if headless or suppressed
    }
  });
}, delayMs);
