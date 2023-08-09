"use client";

import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { useConnectionStatus } from "@/src/hooks/useConnectionStatus";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { SettingsNav } from "./settings";
import { CircleIcon } from "@/src/components/sidebar/circle-icon";
import { Route } from "@/src/components/sidebar/routes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface SidebarProps {
  routes: Route[];
}

export function Sidebar({ routes }: SidebarProps) {
  const pathname = usePathname();

  const isConnectionActive = useConnectionStatus();

  return (
    <div className="flex min-h-screen flex-col bg-background border-r px-4">
      <div
        aria-label="logo group"
        className="scroll-m-20 text-3xl font-bold tracking-tight mt-2 "
      >
        <h2 className="truncate">Sample</h2>
        <div className="flex gap-1">
          <h2 className="pb-3 truncate">Dashboard</h2>
          <CircleIcon className="text-primary w-3 flex-shrink-0" />
        </div>
      </div>

      <div className="flex flex-col grow justify-between">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-2">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg p-2 transition-colors cursor-default",
                pathname === route.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
                route.disabled && "opacity-50"
              )}
            >
              <route.icon className="w-6 h-6 shrink-0" />
              <p className="font-medium text-sm truncate">{route.name}</p>
            </Link>
          ))}
        </nav>
        <div className="mb-2 flex justify-between">
          <ThemeSwitcher />
          <SettingsNav />
          {!isConnectionActive && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ExclamationTriangleIcon className="w-5 h-5 text-destructive animate-pulse" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lost connection to server</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
}
