//! Implements serializing and deserializing the application's `config.json`
//! which contains global configuration about all vaults.

use super::config::AppConfig;

pub fn deserialize_config(config_string: &str) -> Result<AppConfig, anyhow::Error> {
    let app_config: AppConfig = serde_json::from_str(config_string)?;
    Ok(app_config)
}

pub fn serialize_config(config: &AppConfig) -> Result<String, anyhow::Error> {
    let serialized_config = serde_json::to_string_pretty(config)?;
    Ok(serialized_config)
}
