import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SideMenu } from './components';
import { leftTabItems, menuItems, rightTabItems } from './data';

export default function Layout() {
  return (
    <>
      <AppBar
        component="nav"
        sx={{ top: 'auto', bottom: 0, backgroundColor: '#f6f8fa' }}
      >
        <Toolbar variant="dense">
          <Typography variant="overline" color="gray">
            Note App
          </Typography>
        </Toolbar>
      </AppBar>
      <SideMenu
        menuItems={menuItems}
        tabItems={leftTabItems}
        anchor="left"
        defaultOpen
      />
      <Toolbar />
      <Container>
        <Outlet />
      </Container>
      <SideMenu menuItems={menuItems} tabItems={rightTabItems} anchor="right" />
    </>
  );
}
