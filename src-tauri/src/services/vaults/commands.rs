#[derive(serde::Serialize, serde::Deserialize, Debug, Clone, ts_rs::TS)]
#[ts(export)]
pub struct AppConfigGetVaultsPayload {
    pub vaults: Vec<AppConfigGetVaultsVault>,
}

#[derive(serde::Serialize, serde::Deserialize, Debug, Clone, ts_rs::TS)]
pub struct AppConfigGetVaultsVault {
    path: String,
}
