import {
  ChevronRight,
  Dashboard,
  ExpandMore,
  Folder,
  Search,
  Umbrella,
} from '@mui/icons-material';
import { TreeItem as MuiTreeItem, TreeView } from '@mui/lab';
import { IconButton, TextField, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import { pathFor, PathName } from '@/ui/utilities/paths';
import { useVaultPages } from '@/ui/hooks/query';
import { parsePathListToTree, TreeNode } from '@/lib/path/pathListToTree';

interface TreeItemProps {
  node: TreeNode;
}

function TreeItem({ node }: TreeItemProps) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (node.children.length !== 0) {
      return;
    }
    navigate(
      pathFor({
        path: PathName.PAGES,
        params: { filepath: node.fullName },
      })
    );
  };

  return (
    <MuiTreeItem
      nodeId={node.fullName}
      key={node.fullName}
      label={node.name}
      onClick={handleOnClick}
    >
      {node.children.map((nodeItem) => (
        <TreeItem key={nodeItem.fullName} node={nodeItem} />
      ))}
    </MuiTreeItem>
  );
}

function FolderView() {
  const { data } = useVaultPages('testvault');
  const tree: TreeNode[] = parsePathListToTree(data || []);

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {tree.map((treeNode) => (
        <TreeItem key={treeNode.fullName} node={treeNode} />
      ))}
    </TreeView>
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
