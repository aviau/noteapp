import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SideMenu, TopBar } from './components';
import { leftTabItems, menuItems, rightTabItems } from './data';

export function Layout() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <TopBar />
      <SideMenu
        menuItems={menuItems}
        tabItems={leftTabItems}
        anchor="left"
        defaultOpen
      />
      <Container>
        <Toolbar />
        <Outlet />
      </Container>
      <SideMenu menuItems={menuItems} tabItems={rightTabItems} anchor="right" />
    </Box>
  );
}
