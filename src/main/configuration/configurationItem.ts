export enum ConfigurationKey {
  VAULT = 'vault',
  DEBUG = 'debug',
}

export interface VaultConfiguration {
  key: ConfigurationKey.VAULT;
  data: {
    current: string;
  };
}

export interface DebugConfiguration {
  key: ConfigurationKey.DEBUG;
  data: {
    enabled: boolean;
  };
}

export type ConfigurationItem = VaultConfiguration | DebugConfiguration;
