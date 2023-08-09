"use client";

import { CrumpledPaperIcon, ReaderIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

export type Route = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
};

export const routes: Route[] = [
  {
    name: "Products",
    href: "/product",
    icon: CrumpledPaperIcon,
  },
  {
    name: "Purchase Orders",
    href: "/purchase-orders",
    icon: ReaderIcon,
  },
];
