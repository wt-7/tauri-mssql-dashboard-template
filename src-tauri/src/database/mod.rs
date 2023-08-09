pub mod manager;
pub mod types;

use anyhow::Context;
use futures_util::TryStreamExt;
use manager::TiberiusConnectionManager;
use serde::de::DeserializeOwned;
use tiberius::{Query, QueryItem};
use types::{ProductData, PurchaseOrderData};

pub struct SQLServer {
    pool: bb8::Pool<TiberiusConnectionManager>,
}

impl SQLServer {
    pub fn new(pool: bb8::Pool<TiberiusConnectionManager>) -> Self {
        SQLServer { pool }
    }

    pub async fn is_connection_active(&self) -> bool {
        self.pool.get().await.is_ok()
    }

    pub async fn get_product(&self, product_id: &str) -> anyhow::Result<ProductData> {
        let sql = include_str!("./queries/product.sql");

        self.json_query::<ProductData>(sql, vec![product_id]).await
    }

    pub async fn get_purchase_orders(&self) -> anyhow::Result<PurchaseOrderData> {
        let sql = include_str!("./queries/purchase_orders.sql");

        self.json_query::<PurchaseOrderData>(sql, vec![]).await
    }

    // This function is intended to be used for queries that use FOR JSON PATH to return a single row.
    // Doing so avoids the need to create a from_row method for each struct
    async fn json_query<T>(&self, sql: &str, params: Vec<&str>) -> anyhow::Result<T>
    where
        T: DeserializeOwned,
    {
        let mut client = self
            .pool
            .get()
            .await
            .context("Failed to connect to server")?;

        let mut select = Query::new(sql);

        params.into_iter().for_each(|param| {
            select.bind(param);
        });

        let mut stream = select.query(&mut client).await?;

        let mut json_buffer = String::new();

        while let Some(item) = stream.try_next().await? {
            if let QueryItem::Row(row) = item {
                let value: Option<&str> = row.get(0);
                if let Some(partial_string) = value {
                    json_buffer.push_str(partial_string);
                }
            }
        }
        serde_json::from_str::<T>(&json_buffer).context("Failed to parse JSON")
    }
}
