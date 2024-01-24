use super::deserialize_date;
use serde::{Deserialize, Deserializer, Serialize, Serializer};

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct MonthlyOrder {
    month: String,
    orders: i32,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct PurchaseOrderLine {
    stock_code: String,
    description: String,
    order_quantity: f64,
    material_cost: f64,
    product_class: String,
    due_date: String,
    arrived: bool,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct PurchaseOrder {
    purchase_order_id: String,
    order_status: OrderStatus,
    supplier: String,
    #[serde(default)]
    lines: Vec<PurchaseOrderLine>,
    #[serde(default, deserialize_with = "deserialize_date")]
    order_date: Option<String>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]

pub struct PurchaseOrderData {
    #[serde(default)]
    purchase_orders: Vec<PurchaseOrder>,
    #[serde(default)]
    monthly_orders: Vec<MonthlyOrder>,
}

#[derive(Debug)]
enum OrderStatus {
    Open,
    Delayed,
    Arrived,
    Unknown,
}

impl OrderStatus {
    pub fn from_str(s: &str) -> Self {
        match s {
            "Open" => OrderStatus::Open,
            "Delayed" => OrderStatus::Delayed,
            "Arrived" => OrderStatus::Arrived,
            _ => OrderStatus::Unknown,
        }
    }

    pub fn to_str(&self) -> &str {
        match self {
            OrderStatus::Open => "Open",
            OrderStatus::Delayed => "Delayed",
            OrderStatus::Arrived => "Arrived",
            OrderStatus::Unknown => "Unknown",
        }
    }
}

impl Serialize for OrderStatus {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_str())
    }
}

impl<'de> Deserialize<'de> for OrderStatus {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        Ok(OrderStatus::from_str(&s))
    }
}
