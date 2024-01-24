use crate::database::SQLServer;
use crate::schema::{ProductData, PurchaseOrderData};
use anyhow::Result;
use tauri::State;

#[tauri::command]
pub async fn get_product(
    sql_server: State<'_, SQLServer>,
    product_id: &str,
) -> Result<ProductData, String> {
    sql_server
        .get_product(product_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_purchase_orders(
    sql_server: State<'_, SQLServer>,
) -> Result<PurchaseOrderData, String> {
    sql_server
        .get_purchase_orders()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn is_connection_active(sql_server: State<'_, SQLServer>) -> Result<bool, String> {
    Ok(sql_server.is_connection_active().await)
}
