use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct AppConfig {
    pub vaults: HashMap<String, VaultConfig>,
}

impl AppConfig {
    pub fn default() -> Self {
        Self {
            vaults: HashMap::default(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct VaultConfig {
    pub path: String,
    pub open: bool,
}
