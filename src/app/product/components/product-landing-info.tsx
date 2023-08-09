import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";

export function ProductLandingInfo() {
  return (
    <div className="mx-12 my-6">
      <Alert>
        <InfoCircledIcon className="h-4 w-4" />
        <AlertTitle>Product</AlertTitle>
        <AlertDescription>
          Fetch data with useQuery and Tauri commands from a form input.
        </AlertDescription>
      </Alert>
    </div>
  );
}
