#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

//////////////
// COMMANDS //
//////////////

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

//////////
// MAIN //
//////////

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![utils_ping])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
