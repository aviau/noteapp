import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <h1>Note App</h1>
      <ul>
        <li>
          <Link to="/">HelloWorld page</Link>
        </li>
        <li>
          <Link to="/nono">Invalid page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
