import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SessionBoard",
  description: "Training plan management for youth soccer clubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
