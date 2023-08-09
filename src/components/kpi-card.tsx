import { IconProps } from "@radix-ui/react-icons/dist/types";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface KPICardProps {
  title: string;
  metric: number | string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  text?: string;
}

export function KPICard({ title, metric, Icon, text }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{metric}</div>
        <p className="text-xs text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}
