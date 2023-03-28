import rimraf from 'rimraf';
import process from 'process';
import webpackVars from '../configs/webpack.vars';

const args = process.argv.slice(2);
const commandMap = {
  dist: webpackVars.distPath,
  release: webpackVars.releasePath,
  dll: webpackVars.dllPath,
};

args.forEach((x) => {
  const pathToRemove = commandMap[x];
  if (pathToRemove !== undefined) {
    rimraf.sync(pathToRemove);
  }
});
