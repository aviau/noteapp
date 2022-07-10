import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import { BottomBar, SideMenu, TopBar } from './components';
import { leftTabItems, menuItems, rightTabItems } from './data';

const AppContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
}));

const MainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
}));

export function MainLayout() {
  return (
    <AppContainer>
      <TopBar />
      <MainContainer>
        <SideMenu
          menuItems={menuItems}
          tabItems={leftTabItems}
          anchor="left"
          defaultOpen
        />
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <Outlet />
        </Box>
        <SideMenu
          menuItems={menuItems}
          tabItems={rightTabItems}
          anchor="right"
        />
      </MainContainer>
      <BottomBar />
    </AppContainer>
  );
}
