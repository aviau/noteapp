import lodash from 'lodash';
import fs from 'fs/promises';
import path from 'path';
import { assertUnreachable } from '../../../lib/asserts';
import {
  ConfigurationItem,
  ConfigurationKey,
  DebugConfiguration,
  VaultConfiguration,
} from './configurationItem';

export class ConfigurationService {
  userDataPath: string;

  constructor(userDataPath: string) {
    this.userDataPath = userDataPath;
  }

  async setConfiguration(item: ConfigurationItem): Promise<void> {
    const configurationObject = await this.loadSettingsJson();
    configurationObject[item.key] = item.data;
    await this.saveSettingsJson(configurationObject);
  }

  async getVaultConfiguration(): Promise<VaultConfiguration> {
    const config = await this.getConfiguration(ConfigurationKey.VAULT);
    return config as VaultConfiguration;
  }

  async getDebugConfiguration(): Promise<DebugConfiguration> {
    const config = await this.getConfiguration(ConfigurationKey.DEBUG);
    return config as DebugConfiguration;
  }

  private async getConfiguration(
    key: ConfigurationKey
  ): Promise<ConfigurationItem> {
    const configurationObject = await this.loadSettingsJson();

    let configurationData = configurationObject[key] || {};

    // There could be missing keys, add them.
    configurationData = lodash.mergeWith(
      this.defaultConfiguration(key).data,
      configurationData,
      (_, b) => {
        return lodash.isArray(b) ? b : undefined;
      }
    );

    const configurationItem = {
      key,
      data: configurationData,
    } as ConfigurationItem;

    return configurationItem;
  }

  // Get the default configuration item for a given key.
  private defaultConfiguration(key: ConfigurationKey): ConfigurationItem {
    switch (key) {
      case ConfigurationKey.VAULT:
        return {
          key: ConfigurationKey.VAULT,
          data: {
            lastActiveVaultId: null,
          },
        };
      case ConfigurationKey.DEBUG:
        return {
          key: ConfigurationKey.DEBUG,
          data: {
            enabled: false,
          },
        };
      default:
        return assertUnreachable(key);
    }
  }

  async ensureSettingsDir(): Promise<void> {
    try {
      await fs.stat(this.userDataPath);
    } catch (error) {
      const err = error as any;
      if (err.code !== 'ENOENT') {
        throw error;
      }
      await fs.mkdir(this.userDataPath);
    }
  }

  async ensureSettingsFile(): Promise<void> {
    await this.ensureSettingsDir();
    const settingsFilePath = this.getSettingsFilePath();
    try {
      await fs.stat(settingsFilePath);
    } catch (error) {
      const err = error as any;
      if (err.code !== 'ENOENT') {
        throw error;
      }
      await fs.writeFile(settingsFilePath, '{}');
    }
  }

  private getSettingsFilePath(): string {
    return path.join(this.userDataPath, 'settings.json');
  }

  private async loadSettingsJson(): Promise<any> {
    await this.ensureSettingsFile();
    const filePath = this.getSettingsFilePath();
    const fileData = await fs.readFile(filePath, 'utf-8');
    const settingsObject = JSON.parse(fileData);
    return settingsObject;
  }

  private async saveSettingsJson(settings: object): Promise<void> {
    await this.ensureSettingsFile();
    const filePath = this.getSettingsFilePath();
    const fileData = JSON.stringify(settings, null, 4);
    await fs.writeFile(filePath, fileData);
  }
}
