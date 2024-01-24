use async_trait::async_trait;
use bb8;
use tiberius::SqlBrowser;
use tiberius::{Client, Config};
use tokio::net::TcpStream;
use tokio_util::compat::{Compat, TokioAsyncWriteCompatExt};

pub struct TiberiusConnectionManager {
    config: Config,
}

impl TiberiusConnectionManager {
    pub fn new(config: Config) -> tiberius::Result<TiberiusConnectionManager> {
        Ok(TiberiusConnectionManager { config })
    }
}
#[async_trait]
impl bb8::ManageConnection for TiberiusConnectionManager {
    type Connection = Client<Compat<TcpStream>>;
    type Error = tiberius::error::Error;

    async fn connect(&self) -> anyhow::Result<Self::Connection, Self::Error> {
        let tcp = TcpStream::connect_named(&self.config).await?;
        tcp.set_nodelay(true)?;

        Client::connect(self.config.clone(), tcp.compat_write()).await
    }

    async fn is_valid(&self, conn: &mut Self::Connection) -> Result<(), Self::Error> {
        conn.simple_query("SELECT 1").await?;
        Ok(())
    }

    fn has_broken(&self, _: &mut Self::Connection) -> bool {
        false
    }
}
