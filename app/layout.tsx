import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Toma Hamidu Haruna | Blockchain & AI Developer",
  description:
    "Self-taught developer specializing in blockchain, AI, and full-stack development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
