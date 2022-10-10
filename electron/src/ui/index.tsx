import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import App from './foundation/App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);
