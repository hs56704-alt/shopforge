import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",    // CSS variable we can use anywhere
});

export const metadata: Metadata = {
  title: {
    default: "ShopForge — Launch Your Store Today",
    template: "%s | ShopForge",   
  },
  description: "The easiest way to launch and grow your online store.",
  keywords: ["ecommerce", "saas", "online store", "shopforge"],
  openGraph: {
    type: "website",
    siteName: "ShopForge",
    title: "ShopForge — Launch Your Store Today",
    description: "The easiest way to launch and grow your online store.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
