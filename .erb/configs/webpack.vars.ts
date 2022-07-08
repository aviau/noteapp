const path = require('path');

const rootPath = path.join(__dirname, '../..');

const dllPath = path.join(__dirname, '../dll');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath, 'main');
const srcUiPath = path.join(srcPath, 'ui');
const srcWorkerPath = path.join(srcPath, 'worker');

const releasePath = path.join(rootPath, 'release');
const appPath = path.join(releasePath, 'app');
const appPackagePath = path.join(appPath, 'package.json');
const appNodeModulesPath = path.join(appPath, 'node_modules');
const srcNodeModulesPath = path.join(srcPath, 'node_modules');

const distPath = path.join(appPath, 'dist');
const distMainPath = path.join(distPath, 'main');
const distUiPath = path.join(distPath, 'ui');
const distWorkerPath = path.join(distPath, 'worker');

const buildPath = path.join(releasePath, 'build');

const workerPort = 1213;
const uiPort = 1212;

export default {
  rootPath,
  dllPath,
  srcPath,
  srcMainPath,
  srcUiPath,
  srcWorkerPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distUiPath,
  distWorkerPath,
  buildPath,
  workerPort,
  uiPort,
};
