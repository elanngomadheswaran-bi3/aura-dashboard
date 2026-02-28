import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingProvider } from "../context/LoadingContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "BI3 Dashboard",
  description: "Project Intelligence Overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
