import path from 'path';
import rimraf from 'rimraf';
import webpackVars from '../configs/webpack.vars';

export default function deleteSourceMaps() {
  rimraf.sync(path.join(webpackVars.distMainPath, '*.js.map'));
  rimraf.sync(path.join(webpackVars.distUiPath, '*.js.map'));
  rimraf.sync(path.join(webpackVars.distWorkerPath, '*.js.map'));
}
