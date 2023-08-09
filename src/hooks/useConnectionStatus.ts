import { invoke } from "@tauri-apps/api/tauri";
import * as React from "react";

export function useConnectionStatus() {
  const [isOnline, setIsOnline] = React.useState(false);

  async function getConnectionStatus() {
    const data = await invoke<boolean>("is_connection_active");
    setIsOnline(data);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      getConnectionStatus();
    }, 10 * 1000);

    getConnectionStatus();

    return () => clearInterval(interval);
  }, []);
  return isOnline;
}
