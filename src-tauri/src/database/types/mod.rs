mod deserializers;
mod product;
mod purchase_order;

pub use deserializers::*;
pub use product::*;
pub use purchase_order::*;

pub trait FromRow
where
    Self: Sized,
{
    fn from_row(row: tiberius::Row) -> anyhow::Result<Self>;
}
