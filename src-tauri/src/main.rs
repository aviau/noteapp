// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod app_state;
mod services;

fn main() {
    // Services
    let demo_service = services::demo::DemoService::new();

    // Application State
    let state = app_state::AppState::new(demo_service);

    // Tauri Init
    tauri::Builder::default()
        // ######################
        // ## STATE MANAGEMENT ##
        // ######################
        .manage(state)
        // ##############
        // ## COMMANDS ##
        // ##############
        .invoke_handler(tauri::generate_handler![
            // SERVICE: DEMO
            services::demo::commands::demo_greet
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
