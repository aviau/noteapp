// Vendored from: https://github.com/pthm/node-path-list-to-tree
// LICENSE: MIT
// AUTHOR: Patt-tom McDonnell <contact@mcdonnell.pt>
// NOTE: Adapted to preserve full names.

export interface TreeNode {
  name: string;
  fullName: string;
  children: TreeNode[];
}

function createNode(prefix: string, path: string[], tree: TreeNode[]): void {
    const name = path.shift() || "unknown";
    const fullName = prefix + (prefix ? "/" : "") + name;
    const idx = tree.findIndex((e: TreeNode) => {
        return e.name === name;
    });
    if (idx < 0) {
        tree.push({
            name,
            fullName,
            children: [],
        });
        if (path.length !== 0) {
            createNode(fullName, path, tree[tree.length - 1].children);
        }
    } else {
        createNode(fullName, path, tree[idx].children);
    }
}

export function parsePathListToTree(data: string[]): TreeNode[] {
    const tree: TreeNode[] = [];
    for (let i = 0; i < data.length; i += 1) {
        const path: string = data[i];
        const split: string[] = path.split("/");
        createNode("", split, tree);
    }
    return tree;
}
