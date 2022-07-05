import { Navigate } from 'react-router-dom';

import { HelloWorld, Editor, NotFound } from '../sections';
import Layout from './Layout';

const routes = () => [
  {
    path: '/',
    element: <Layout />,
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