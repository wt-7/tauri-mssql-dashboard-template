pub mod manager;

use crate::schema::{ProductData, PurchaseOrderData};
use anyhow::Context;
use futures_util::{Stream, TryStreamExt};
use manager::TiberiusConnectionManager;
use serde::de::DeserializeOwned;
use tiberius::{Query, QueryItem};

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
        let sql = include_str!("../schema/product.sql");

        self.json_query::<ProductData>(sql, &[product_id.into()])
            .await
    }

    pub async fn get_purchase_orders(&self) -> anyhow::Result<PurchaseOrderData> {
        let sql = include_str!("../schema/purchase_orders.sql");

        self.json_query::<PurchaseOrderData>(sql, &[]).await
    }

    // This function is intended to be used for queries that use FOR JSON PATH to return a single row.
    // Doing so avoids the need to create a from_row method for each struct
    async fn json_query<T>(&self, sql: &str, params: &[String]) -> anyhow::Result<T>
    where
        T: DeserializeOwned,
    {
        let mut client = self
            .pool
            .get()
            .await
            .context("Failed to connect to server")?;

        let mut select = Query::new(sql);

        for param in params {
            select.bind(param);
        }

        let mut stream = select.query(&mut client).await?;

        let size = stream.size_hint().0;

        let mut json_buffer = String::with_capacity(size);

        while let Some(item) = stream.try_next().await? {
            if let QueryItem::Row(row) = item {
                let value: Option<&str> = row.get(0);
                if let Some(partial_string) = value {
                    json_buffer.push_str(partial_string);
                }
            }
        }

        if json_buffer.is_empty() {
            anyhow::bail!("No data returned from query");
        }

        serde_json::from_str::<T>(&json_buffer).context("Failed to parse JSON")
    }
}
