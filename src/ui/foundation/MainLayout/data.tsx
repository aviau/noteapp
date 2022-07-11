import {
  ChevronRight,
  Dashboard,
  ExpandMore,
  Folder,
  LightMode,
  DarkMode,
  Search,
  Umbrella,
} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';
import { IconButton, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { pathFor, PathName } from '@/ui/utilities/paths';
import { ThemeContext } from '../ThemeProvider';

function FolderView() {
  const navigate = useNavigate();

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="journals">
        <TreeItem
          nodeId="2"
          label="day1"
          onClick={() =>
            navigate(
              pathFor({
                path: PathName.PAGES,
                params: { filepath: 'journals/day1.md' },
              })
            )
          }
        />
      </TreeItem>
      <TreeItem nodeId="5" label="pages">
        <TreeItem nodeId="6" label="meetings">
          <TreeItem
            nodeId="8"
            label="Alex"
            onClick={() =>
              navigate(
                pathFor({
                  path: PathName.PAGES,
                  params: { filepath: 'pages/meetings/alex.md' },
                })
              )
            }
          />
          <TreeItem
            nodeId="9"
            label="Fidji"
            onClick={() =>
              navigate(
                pathFor({
                  path: PathName.PAGES,
                  params: { filepath: 'pages/meetings/fidji.md' },
                })
              )
            }
          />
        </TreeItem>
        <TreeItem
          nodeId="10"
          label="How to take notes"
          onClick={() =>
            navigate(
              pathFor({
                path: PathName.PAGES,
                params: { filepath: 'pages/how-to-take-notes.md' },
              })
            )
          }
        />
      </TreeItem>
    </TreeView>
  );
}

function ToggleThemeIcon() {
  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <IconButton onClick={() => toggleMode()}>
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}

export const menuItems = [
  {
    id: 'Dashboard',
    icon: (
      <IconButton component={NavLink} to={pathFor({ path: PathName.HOME })}>
        <Dashboard />
      </IconButton>
    ),
  },
  {
    id: 'Something',
    icon: (
      <IconButton component={NavLink} to="/nono">
        <Umbrella />
      </IconButton>
    ),
  },
  { id: 'ToggleTheme', icon: <ToggleThemeIcon /> },
];

export const leftTabItems = [
  {
    id: 'search_tab',
    icon: <Search />,
    children: (
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        type="search"
        size="small"
      />
    ),
  },
  {
    id: 'folder_tab',
    icon: <Folder />,
    children: <FolderView />,
  },
];

export const rightTabItems = [
  {
    id: 'item_1',
    label: 'Item 1',
    children: <Typography paragraph>Item 1</Typography>,
  },
  {
    id: 'item_2',
    label: 'Item 2',
    children: <Typography paragraph>Item 2</Typography>,
  },
];
