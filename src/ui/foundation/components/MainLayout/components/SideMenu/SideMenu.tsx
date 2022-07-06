import {
  Divider,
  Drawer as MuiDrawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { TabItem, TabsPanel } from './components';

export type MenuItem = {
  id: string;
  icon: React.ReactElement;
  route?: string;
};

const drawerWidth = '30vw';
const minDrawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  minWidth: minDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  minWidth: minDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  menuItems: MenuItem[];
  tabItems: TabItem[];
  anchor: 'left' | 'right';
  defaultOpen?: boolean;
}

export function SideMenu({
  menuItems,
  tabItems,
  anchor,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // TODO: Fix Chevron direction based on the anchor
  return (
    <Drawer variant="permanent" anchor={anchor} open={open}>
      <Toolbar variant="dense" />
      <Grid
        container
        direction={anchor === 'left' ? 'row' : 'row-reverse'}
        sx={{ height: '100%' }}
      >
        <Grid
          item
          xs={open ? 2 : 12}
          sx={{
            backgroundColor: theme.palette.secondary.dark,
            height: '100%',
          }}
        >
          <Toolbar sx={{ px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Toolbar>
          <List>
            {menuItems.map(({ id, icon, route }) =>
              route ? (
                <ListItem key={id} button component={RouterLink} to={route}>
                  <ListItemIcon>{icon}</ListItemIcon>
                </ListItem>
              ) : (
                <ListItem key={id} button>
                  <ListItemIcon>{icon}</ListItemIcon>
                </ListItem>
              )
            )}
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        {open && (
          <Grid item xs>
            <TabsPanel tabItems={tabItems} />
          </Grid>
        )}
      </Grid>
    </Drawer>
  );
}
