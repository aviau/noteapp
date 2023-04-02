//! Implements serializing and deserializing the application's `config.json`
//! which contains global configuration about all vaults.

use serde_json::Result;

use crate::services::app_config::config::AppConfig;

pub fn deserialize_config(config_string: &str) -> Result<AppConfig> {
    let app_config: Result<AppConfig> = serde_json::from_str(config_string);
    app_config
}

pub fn serialize_config(config: &AppConfig) -> Result<String> {
    let serialized_config = serde_json::to_string(config);
    serialized_config
}
