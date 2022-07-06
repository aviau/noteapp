import { Navigate } from 'react-router-dom';

import { Editor, HelloWorld, NotFound } from '../sections';
import { MainLayout } from './components';

const routes = () => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <HelloWorld name="copain" /> },
      {
        path: 'pages',
        element: <Editor />,
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    // TODO: redirect default path on startup
    path: '/index.html',
    element: <Navigate to="/" />,
  },
];

export default routes;
