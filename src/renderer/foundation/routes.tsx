import { Navigate } from 'react-router-dom';

import Layout from './Layout';
import { HelloWorld, NotFound } from '../sections';

const routes = () => [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HelloWorld name="copain" /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/index.html', // TODO: redirect default path on startup
    element: <Layout />,
    children: [{ path: '', element: <HelloWorld name="copinet" /> }],
  },
];

export default routes;
