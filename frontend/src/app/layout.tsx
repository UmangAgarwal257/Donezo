import type { Metadata } from "next";
import { satoshi } from "./fonts/satoshi";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Donezo",
  description: "Get weekly accountability emails inspired by tech visionaries to keep you focused and motivated",
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
        <Script
            defer
            data-domain="https://donezo-theta.vercel.app/" // Replace with your domain
            src="https://analytics-code.vercel.app/tracking-script.js"
          />
        {children}
      </body>
    </html>
  );
}