import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import ToastProvider from "@/providers/ToastProvider";
import { Providers } from "@/providers/SessionProvider";
import { PantryProvider } from "@/providers/PantryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitchen Rescue",
  description: "Kitchen Rescue: Streamline your cooking with smart pantry management and AI-powered recipe suggestions. Reduce food waste, save time, and discover new meals effortlessly.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToastProvider>
            <AppRouterCacheProvider>
              <PantryProvider>
                <ThemeProvider theme={theme}>
                  {children}
                </ThemeProvider>
              </PantryProvider>
            </AppRouterCacheProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
