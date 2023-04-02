use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct AppConfig {
    pub vaults: HashMap<String, VaultConfig>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct VaultConfig {
    pub path: String,
    pub open: bool,
}
