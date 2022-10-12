/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string): string {
  if (process.env.NODE_ENV === 'development') {
    const port = htmlFileName.startsWith('worker') ? 1213 : 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../', htmlFileName)}`;
}
