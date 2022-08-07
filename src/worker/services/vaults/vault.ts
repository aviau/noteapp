import { getFilesAndDirectories } from '@/lib/fs';

export class Vault {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  async getFiles(): Promise<string[]> {
    return (await getFilesAndDirectories(this.path))
      .filter((e) => !e.isDirectory)
      .map((e) => e.name);
  }
}
