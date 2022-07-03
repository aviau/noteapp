import { Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Dashboard, Umbrella } from '@mui/icons-material';

import { SideMenu } from './components';

const menuItems = [
  { label: 'Dashboard', to: '/', icon: <Dashboard /> },
  { label: 'Something', to: '/nono', icon: <Umbrella /> },
];

const tabItems = [
  {
    label: 'Item 1',
    children: <Typography paragraph>Item 1</Typography>,
  },
  {
    label: 'Item 2',
    children: <Typography paragraph>Item 2</Typography>,
  },
];

export default function Layout() {
  return (
    <>
      <SideMenu
        menuItems={menuItems}
        tabItems={tabItems}
        anchor="left"
        defaultOpen
      />
      <Toolbar />
      <Container>
        <Typography variant="h2">Note App</Typography>
        <Outlet />
      </Container>
      <SideMenu menuItems={menuItems} tabItems={tabItems} anchor="right" />
    </>
  );
}
