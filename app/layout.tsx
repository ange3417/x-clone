import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twit",
  description: "シンプルなつぶやきサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  );
}
