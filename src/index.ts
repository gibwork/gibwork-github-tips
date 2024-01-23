import { exec } from 'child_process';
import { run } from './app'

function init() {
  exec('echo "checking notifications"', async (error, _stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    await run();

    setTimeout(init, 500);
  });
}

init();
