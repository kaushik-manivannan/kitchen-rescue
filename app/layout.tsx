import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Tracker AI App",
  description: "Pantry Tracker AI App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ResponsiveAppBar />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
