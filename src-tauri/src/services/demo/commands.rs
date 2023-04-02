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

    demo_service.incr_greeting_invocations()?;

    let total_greeting_invocations = demo_service.get_greeting_invocations()?;

    let response = DemoGreetResponse {
        greeting: format!(
            "Hello, {}! You've been greeted from Rust for the {}th time!",
            payload.name, total_greeting_invocations,
        ),
    };

    Ok(response)
}
