import path from 'path';
import { getFilesAndDirectories } from '../directory';

test('getFiles returns all files recursively', async () => {
  const files = await getFilesAndDirectories(
    path.join(__dirname, 'directoryTest')
  );
  expect(files).toEqual([
    {
      name: 'a.txt',
      isDirectory: false,
    },
    {
      name: 'b',
      isDirectory: true,
    },
    {
      name: 'b/c.txt',
      isDirectory: false,
    },
  ]);
});
