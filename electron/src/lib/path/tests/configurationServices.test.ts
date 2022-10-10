import { parsePathListToTree } from '../pathListToTree';

test('paths are converted to tree', () => {
  const paths = ['journals/day1.md'];
  const tree = parsePathListToTree(paths);
  expect(tree).toEqual([
    {
      name: 'journals',
      fullName: 'journals',
      children: [
        {
          name: 'day1.md',
          fullName: 'journals/day1.md',
          children: [],
        },
      ],
    },
  ]);
});
