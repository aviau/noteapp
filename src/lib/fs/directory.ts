import fs from 'fs';
import path from 'path';

interface Entry {
  name: string;
  isDirectory: boolean;
}

/**
 * Lists all files and directories in a directory, recursively.
 * The base directory is omitted from the returned paths.
 */
export async function getFilesAndDirectories(
  folderPath: string
): Promise<Entry[]> {
  const dirEnts = await fs.promises.readdir(folderPath, {
    withFileTypes: true,
  });

  const entries = dirEnts.map((dirEnt) => {
    return {
      name: dirEnt.name,
      isDirectory: dirEnt.isDirectory(),
    };
  });

  const folders = dirEnts.filter((dirEnt) => dirEnt.isDirectory());

  for (const folder of folders) {
    const folderEntries = await getFilesAndDirectories(
      path.join(folderPath, folder.name)
    );
    entries.push(
      ...folderEntries.map((folderEntry) => {
        return {
          name: path.join(folder.name, folderEntry.name),
          isDirectory: folderEntry.isDirectory,
        };
      })
    );
  }

  return entries;
}
