export enum ConfigurationKey {
  VAULT = 'vault',
  DEBUG = 'debug',
}

export interface VaultConfiguration {
  key: ConfigurationKey.VAULT;
  data: {
    lastActiveVaultId: string | null;
  };
}

export interface DebugConfiguration {
  key: ConfigurationKey.DEBUG;
  data: {
    enabled: boolean;
  };
}

export type ConfigurationItem = VaultConfiguration | DebugConfiguration;
