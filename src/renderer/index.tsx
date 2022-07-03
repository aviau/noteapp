import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './foundation/App';
import { IpcRendererConnection } from './ipcRendererConnection';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const ipcRendererConnection = new IpcRendererConnection();
ipcRendererConnection.mainPing();
