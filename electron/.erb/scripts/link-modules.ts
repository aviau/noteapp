import fs from 'fs';
import webpackVars from '../configs/webpack.vars';

const { srcNodeModulesPath } = webpackVars;
const { appNodeModulesPath } = webpackVars;

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
