#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

/////////////////////
// COMMANDS: UTILS //
/////////////////////

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn utils_ping(message: String) -> UtilsPingResponse {
    UtilsPingResponse {
        message: format!("Hello from rust. You told me {}", message),
    }
}

#[derive(serde::Serialize)]
struct UtilsPingResponse {
    message: String,
}

///////////////////////
// COMMANDS: WINDOWS //
///////////////////////

#[tauri::command]
async fn windows_minimize(window: tauri::Window) -> Result<(), String> {
    match window.minimize() {
        Ok(_) => Ok(()),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
async fn windows_maximize(window: tauri::Window) -> Result<(), String> {
    match window.maximize() {
        Ok(_) => Ok(()),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
async fn windows_quit(window: tauri::Window) -> Result<(), String> {
    match window.close() {
        Ok(_) => Ok(()),
        Err(error) => Err(error.to_string()),
    }
}

/////////////////////////////
// COMMANDS: CONFIGURATION //
/////////////////////////////

#[tauri::command]
async fn configuration_get(key: String) -> Result<String, String> {
    match key.as_str() {
        "vault.last_active" => Ok("mock-vault".to_string()),
        _ => Err(format!("Unknown configuration key: {}", key,).to_string()),
    }
}

//////////
// MAIN //
//////////

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // UTILS
            utils_ping,
            // WINDOWS
            windows_minimize,
            windows_maximize,
            windows_quit,
            // CONFIGURATION
            configuration_get,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
