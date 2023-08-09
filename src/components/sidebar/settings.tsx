import { cn } from "@/src/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function SettingsNav() {
  return (
    <Link
      href={"/settings"}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
      )}
    >
      <GearIcon className="w-5 h-5 shrink-0" />
    </Link>
  );
}
