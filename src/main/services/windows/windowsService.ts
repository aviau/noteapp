/* eslint global-require: off, promise/always-return: off */
import Electron, { BrowserWindow, shell } from 'electron';
import path from 'path';
import { srcPath } from 'src/utils';
import { resolveHtmlPath } from './util';
import { MenuBuilder } from './menu';

async function installExtensions(): Promise<void> {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
}

export class WindowsService {
  private readonly app: Electron.App;

  private workerWindow: BrowserWindow | null;

  private uiWindow: BrowserWindow | null;

  constructor(app: Electron.App) {
    this.app = app;
    this.workerWindow = null;
    this.uiWindow = null;
  }

  async start() {
    if (process.env.NODE_ENV === 'production') {
      const sourceMapSupport = require('source-map-support');
      sourceMapSupport.install();
    }

    const isDebug =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true';

    if (isDebug) {
      require('electron-debug')();
      await installExtensions();
    }

    const RESOURCES_PATH = this.app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(srcPath, '../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    const workerWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        sandbox: false,
      },
    });
    workerWindow.loadURL(resolveHtmlPath('worker/worker.html'));

    const uiWindow = new BrowserWindow({
      show: false,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: this.app.isPackaged
          ? path.join(__dirname, 'preload.prod.js')
          : path.join(srcPath, '../release/app/dist/main/preload.dev.js'),
      },
    });
    uiWindow.loadURL(resolveHtmlPath('ui/ui.html'));

    uiWindow.on('ready-to-show', () => {
      if (!uiWindow) {
        throw new Error('"uiWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        uiWindow.minimize();
      } else {
        uiWindow.show();
      }
    });

    const menuBuilder = new MenuBuilder(uiWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    uiWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    this.workerWindow = workerWindow;
    this.uiWindow = uiWindow;
  }

  getWindows() {
    return {
      uiWindow: this.uiWindow,
      workerWindow: this.workerWindow,
    };
  }

  quit(): void {
    this.app.quit();
  }
}
