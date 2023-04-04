use super::config::AppConfig;
use super::parser;
use anyhow::anyhow;
use std::path::PathBuf;

const CONFIG_JSON_FILENAME: &str = "config.json";

pub struct AppConfigService {
    config_dir_path: PathBuf,
    app_config: AppConfig,
}

impl AppConfigService {
    pub fn init_from_app_handle(app_handle: &tauri::AppHandle) -> Result<Self, anyhow::Error> {
        let config_dir_path = match app_handle.path_resolver().app_config_dir() {
            Some(config_dir) => config_dir,
            None => return Err(anyhow!("could not find app config directory")),
        };

        let app_config = get_or_create_config(&get_config_file_path(&config_dir_path))?;

        let service = Self {
            config_dir_path: config_dir_path,
            app_config: app_config,
        };

        Ok(service)
    }
}

fn get_or_create_config(config_file_path: &PathBuf) -> Result<AppConfig, anyhow::Error> {
    // Try to return the existing config.
    if let Some(app_config) = read_config_file(config_file_path)? {
        return Ok(app_config);
    }

    // Else, create a new one and save it.
    let app_config = AppConfig::default();
    write_config_file(config_file_path, &app_config)?;

    Ok(app_config)
}

fn get_config_file_path(config_dir_path: &PathBuf) -> PathBuf {
    return config_dir_path.join(CONFIG_JSON_FILENAME);
}

fn read_config_file(config_file_path: &PathBuf) -> Result<Option<AppConfig>, anyhow::Error> {
    match config_file_path.try_exists() {
        Ok(exists) => {
            if !exists {
                return Ok(None);
            }
        }
        Err(err) => {
            return Err(err.into());
        }
    }

    let app_config = std::fs::read_to_string(config_file_path)
        .map_err(|err| anyhow::Error::from(err))
        .and_then(|config_string| parser::deserialize_config(&config_string))?;

    Ok(Some(app_config))
}

fn write_config_file(
    config_file_path: &PathBuf,
    app_config: &AppConfig,
) -> Result<(), anyhow::Error> {
    // Create the parent directories if needed.
    if let Some(parent_path) = config_file_path.parent() {
        std::fs::create_dir_all(parent_path)?;
    }

    // Save the file
    let config_str = parser::serialize_config(app_config)?;
    std::fs::write(config_file_path, &config_str)?;

    Ok(())
}
