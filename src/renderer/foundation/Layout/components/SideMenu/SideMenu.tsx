import { ReactNode, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Divider,
  Drawer as MuiDrawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
} from '@mui/material';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { TabItem, TabsPanel } from './components';

export type MenuItem = {
  label: string;
  to: string;
  icon: ReactNode;
};

const drawerWidth = 500;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // TODO: Fix Chevron direction based on the anchor
  return (
    <Drawer variant="permanent" anchor={anchor} open={open}>
      <Grid
        container
        direction={anchor === 'left' ? 'row' : 'row-reverse'}
        sx={{ height: '100%' }}
      >
        <Grid item xs={open ? 2 : 12}>
          <Toolbar sx={{ px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Toolbar>
          <List>
            {menuItems.map(({ label, to, icon }) => (
              <ListItem key={label} button component={RouterLink} to={to}>
                <ListItemIcon>{icon}</ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        {open && (
          <Grid item xs={9}>
            <TabsPanel tabItems={tabItems} />
          </Grid>
        )}
      </Grid>
    </Drawer>
  );
}
