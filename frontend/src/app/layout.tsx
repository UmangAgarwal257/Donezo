import type { Metadata } from "next";
import { satoshi } from "./fonts/satoshi";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Donezo",
  description: "Mail0 is a simple email client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} antialiased w-full`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}