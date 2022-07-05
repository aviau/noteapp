import {
  ChevronRight,
  Dashboard,
  ExpandMore,
  Folder,
  Search,
  Umbrella,
} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../utilities';

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
            navigate(`${paths.markdown}?filepath=journals/day1.md`)
          }
        />
      </TreeItem>
      <TreeItem nodeId="5" label="pages">
        <TreeItem nodeId="6" label="meetings">
          <TreeItem
            nodeId="8"
            label="Alex"
            onClick={() =>
              navigate(`${paths.markdown}?filepath=pages/meetings/alex.md`)
            }
          />
          <TreeItem
            nodeId="9"
            label="Fidji"
            onClick={() =>
              navigate(`${paths.markdown}?filepath=pages/meetings/fidji.md`)
            }
          />
        </TreeItem>
        <TreeItem
          nodeId="10"
          label="How to take notes"
          onClick={() =>
            navigate(`${paths.markdown}?filepath=pages/how-to-take-notes.md`)
          }
        />
      </TreeItem>
    </TreeView>
  );
}

export const menuItems = [
  { label: 'Dashboard', to: '/', icon: <Dashboard /> },
  { label: 'Something', to: '/nono', icon: <Umbrella /> },
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
