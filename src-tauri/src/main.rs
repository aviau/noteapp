// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::error::Error;
use tauri::{api::path::app_config_dir, Manager};

mod app_state;
mod services;

fn main() {
    // Tauri Init
    tauri::Builder::default()
        // ###############
        // ## APP SETUP ##
        // ###############
        .setup(|app| do_setup(app))
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

fn do_setup(app: &mut tauri::App) -> Result<(), Box<dyn Error>> {
    // App
    let app_handle = app.handle();

    // Services
    let app_config_service =
        services::app_config::AppConfigService::init_from_app_handle(&app_handle)?;
    let demo_service = services::demo::DemoService::new();

    // Application State
    let state = app_state::AppState::new(app_config_service, demo_service);

    app.manage(state);

    Ok(())
}
