#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod database;

use commands::{get_product, get_purchase_orders, is_connection_active};
use database::manager::TiberiusConnectionManager;
use database::SQLServer;
use std::time::Duration;
use tauri::Manager;
use tiberius::Config;

const CONNECTION_STRING: &str = r#""#;

const POOL_SIZE: u32 = 3;

const POOL_TIMEOUT_DURATION: Duration = Duration::from_secs(5);

#[tokio::main]
async fn main() {
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();

            tauri::async_runtime::spawn(async move {
                let config = Config::from_ado_string(CONNECTION_STRING).unwrap();
                let manager = TiberiusConnectionManager::new(config).unwrap();
                let pool = bb8::Pool::builder()
                    .max_size(POOL_SIZE)
                    .connection_timeout(POOL_TIMEOUT_DURATION)
                    .build(manager)
                    .await
                    .unwrap();
                let sql_server = SQLServer::new(pool);

                app_handle.manage(sql_server);
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_product,
            get_purchase_orders,
            is_connection_active,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
