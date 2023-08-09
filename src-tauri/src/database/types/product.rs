use super::deserialize_date;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct ProductData {
    product_id: String,
    description: String,
    #[serde(default)]
    components: Vec<ProductComponent>,
    #[serde(default)]
    sales_orders: Vec<SalesOrder>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct ProductComponent {
    component_id: String,
    description: String,
    quantity_per: f64,
    material_cost: f64,
    labour_cost: f64,
    supplier: String,
    date_created: String,
    unallocated: f64,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct SalesOrder {
    sales_order_id: String,
    location: String,
    customer: String,
    #[serde(default, deserialize_with = "deserialize_date")]
    order_date: Option<String>,
    #[serde(default, deserialize_with = "deserialize_date")]
    completion_date: Option<String>,
    order_quantity: f64,
    build_cost: f64,
    sale_price: f64,
    percent_complete: f64,
}
