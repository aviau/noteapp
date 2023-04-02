use crate::app_state::AppState;

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
pub async fn demo_greet(
    state: tauri::State<'_, AppState>,
    payload: DemoGreetPayload,
) -> Result<DemoGreetResponse, String> {
    let demo_service = state.get_demo_service();

    match demo_service.incr_greeting_invocations() {
        Err(err) => return Err(err.to_string()),
        Ok(_) => {}
    };

    let total_greeting_invocations = match demo_service.get_greeting_invocations() {
        Err(err) => return Err(err.to_string()),
        Ok(count) => count,
    };

    let response = DemoGreetResponse {
        greeting: format!(
            "Hello, {}! You've been greeted from Rust for the {}th time!",
            payload.name, total_greeting_invocations,
        ),
    };

    Ok(response)
}
