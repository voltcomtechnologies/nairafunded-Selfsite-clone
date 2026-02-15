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
  title: "NairaFunded — Trading evaluations built for disciplined traders",
  description: "Unlock up to 1.5M MT5 Account with up to 90% profit split and fast 24hr payouts.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NairaFunded — Trading evaluations built for disciplined traders",
    description: "Unlock up to 1.5M MT5 Account with up to 90% profit split and fast 24hr payouts.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <ParticlesBackground />
        {children}
        <Footer />
      </body>
    </html>
  );
}
