import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './foundation/App';
import { UiMain } from './uiMain';
import { IpcRendererConnection } from './ipcRendererConnection';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const uiMain = new UiMain(new IpcRendererConnection());
uiMain.main();
