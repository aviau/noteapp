import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import App from './foundation/App';
import { UiMain } from './uiMain';
import { IpcUiService } from './services/ipc/ipcUiService';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

export const uiMain = new UiMain(new IpcUiService());
uiMain.main();
