#[derive(serde::Serialize, serde::Deserialize, Debug, Clone, ts_rs::TS)]
#[ts(export)]
pub struct DemoGreetPayload {
    pub name: String,
}

#[derive(serde::Serialize, serde::Deserialize, Debug, Clone, ts_rs::TS)]
#[ts(export)]
pub struct DemoGreetResponse {
    pub greeting: String,
}

#[tauri::command]
pub async fn greet(payload: DemoGreetPayload) -> DemoGreetResponse {
    DemoGreetResponse {
        greeting: format!("Hello, {}! You've been greeted from Rust!", payload.name),
    }
}
