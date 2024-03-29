import path from 'path';
import { ConfigurationService, ConfigurationKey } from '..';
import { tempDir } from '../../../../lib/tests/utils';

test('vault has a default config', async () => {
  const dir = path.join(await tempDir(), 'test');
  const service = new ConfigurationService(dir);
  const loadedItem = await service.getVaultConfiguration();
  expect(loadedItem).toEqual({
    key: ConfigurationKey.VAULT,
    data: {
      lastActiveVaultId: null,
    },
  });
});

test('save and load a config object', async () => {
  const dir = path.join(await tempDir(), 'test');
  const service = new ConfigurationService(dir);
  await service.setConfiguration({
    key: ConfigurationKey.VAULT,
    data: {
      lastActiveVaultId: 'copina',
    },
  });
  const loadedItem = await service.getVaultConfiguration();
  expect(loadedItem).toEqual({
    key: ConfigurationKey.VAULT,
    data: {
      lastActiveVaultId: 'copina',
    },
  });
});
