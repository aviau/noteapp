//! Implements serializing and deserializing the application's `config.json`
//! which contains global configuration about all vaults.

use std::error::Error;

use crate::services::app_config::config::AppConfig;

pub fn deserialize_config(config_string: &str) -> Result<AppConfig, Box<dyn Error>> {
    let app_config: AppConfig = serde_json::from_str(config_string)?;
    Ok(app_config)
}

pub fn serialize_config(config: &AppConfig) -> Result<String, Box<dyn Error>> {
    let serialized_config = serde_json::to_string(config)?;
    Ok(serialized_config)
}
