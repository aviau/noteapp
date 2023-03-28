import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { TabsPanel, TabItem } from '@/ui/components';

const ListDynamicColor = styled(List, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: open
    ? theme.palette.secondary.dark
    : theme.palette.secondary.main,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

export type MenuItem = {
  id: string;
  icon: React.ReactElement;
};

interface Props {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
  tabItems: TabItem[];
  anchor: 'left' | 'right';
  defaultOpen?: boolean;
}

export function SideMenu({
  topItems,
  bottomItems,
  tabItems,
  anchor,
  defaultOpen = false,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderChevron = () => {
    if (anchor === 'left') {
      return open ? <ChevronLeft /> : <ChevronRight />;
    }
    return open ? <ChevronRight /> : <ChevronLeft />;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: anchor === 'left' ? 'row' : 'row-reverse',
      }}
    >
      <ListDynamicColor open={open} sx={{ pb: theme.spacing(10) }}>
        <ListItem disablePadding sx={{ mb: theme.spacing(2) }}>
          <IconButton onClick={toggleDrawer}>{renderChevron()}</IconButton>
        </ListItem>
        {topItems?.map(({ id, icon }) => (
          <ListItem key={id} disablePadding>
            {icon}
          </ListItem>
        ))}
        <Box sx={{ flex: 1 }} />
        {bottomItems?.map(({ id, icon }) => (
          <ListItem key={id} disablePadding>
            {icon}
          </ListItem>
        ))}
      </ListDynamicColor>
      <Collapse
        in={open}
        orientation="horizontal"
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <Box sx={{ minWidth: 400 }}>
          <TabsPanel items={tabItems} />
        </Box>
      </Collapse>
      <Divider orientation="vertical" flexItem />
    </Box>
  );
}
