// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import webpackVars from '../configs/webpack.vars';

const mainPath = path.join(webpackVars.distMainPath, 'main.prod.js');
const uiPath = path.join(webpackVars.distUiPath, 'ui.prod.js');
const workerPath = path.join(webpackVars.distWorkerPath, 'worker.prod.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build:main"'
    )
  );
}

if (!fs.existsSync(uiPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "npm run build:renderer"'
    )
  );
}

if (!fs.existsSync(workerPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The worker process is not built yet. Build it by running "npm run build:worker"'
    )
  );
}
