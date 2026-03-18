import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nairafunded.com"),
  title: {
    default: "NairaFunded — Trading evaluations built for disciplined traders",
    template: "%s | NairaFunded",
  },
  description:
    "Nigeria's #1 prop trading firm. Access funded MT5 accounts up to ₦1.5M with 90% profit split and fast 24hr payouts.",
  keywords: [
    "prop trading Nigeria",
    "funded trader Nigeria",
    "forex evaluation account",
    "NairaFunded",
    "MT5 funded account",
    "prop firm Nigeria",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "NairaFunded — Trading evaluations built for disciplined traders",
    description:
      "Nigeria's #1 prop trading firm. Access funded MT5 accounts up to ₦1.5M with 90% profit split and fast 24hr payouts.",
    url: "https://nairafunded.com",
    siteName: "NairaFunded",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NairaFunded Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NairaFunded — Trading evaluations built for disciplined traders",
    description:
      "Nigeria's #1 prop trading firm. Access funded MT5 accounts up to ₦1.5M with 90% profit split and fast 24hr payouts.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <ParticlesBackground />
        {children}
        <Footer />
      </body>
    </html>
  );
}
