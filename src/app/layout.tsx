import "../style.css";
import { Inter } from "next/font/google";
import { Toaster } from "../components/ui/toaster";
import { ReactQueryProvider } from "../providers/react-query-provider";
import { NextThemeProvider } from "../providers/next-theme-provider";
import { JotaiProvider } from "../providers/jotai-provider";
import { cn } from "../lib/utils";
import { Sidebar } from "../components/sidebar/sidebar";
import { routes } from "../components/sidebar/routes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body
          className={cn(
            "font-sans antialiased bg-background text-foreground min-h-screen",
            inter.variable
          )}
        >
          <JotaiProvider>
            <NextThemeProvider>
              <main className="grid grid-cols-12">
                <aside className="sticky top-0 h-screen col-span-2">
                  <Sidebar routes={routes} />
                </aside>
                <div className="col-span-10">{children}</div>
                <Toaster />
              </main>
            </NextThemeProvider>
          </JotaiProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
