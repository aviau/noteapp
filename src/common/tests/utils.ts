import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export async function tempDir() {
  const osTempDir = os.tmpdir();
  const dir = await fs.mkdtemp(path.join(osTempDir, 'noteapp'));
  return dir;
}
