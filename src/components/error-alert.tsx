import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { IconProps } from "@radix-ui/react-icons/dist/types";

interface ErrorAlertProps {
  title: string;
  text: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}

export default function ErrorAlert({
  title,
  text,
  icon: Icon = ExclamationTriangleIcon,
}: ErrorAlertProps) {
  return (
    <div className="mx-12 my-6">
      <Alert variant={"destructive"}>
        <Icon className="h-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{text}</AlertDescription>
      </Alert>
    </div>
  );
}
