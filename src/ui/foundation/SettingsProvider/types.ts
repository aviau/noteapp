type ThemeMode = 'light' | 'dark';

export interface AppearanceSettings {
  mode: ThemeMode;
}

export interface Settings {
  appearance: AppearanceSettings;
}
