import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Devolympus Hackathon",
    default: "Devolympus Hackathon | The Ultimate Coding Experience",
  },
  description:
    "Join Devolympus Hackathon - The ultimate hackathon experience for developers, designers, and innovators. Connect, code, and conquer!",
  keywords: [
    "hackathon",
    "coding",
    "programming",
    "developers",
    "tech event",
    "Devolympus",
    "Deviators Club",
  ],
  authors: [{ name: "Deviators Club", url: "https://www.deviatorsdce.tech" }],
  creator: "Deviators Club",
  publisher: "Deviators Club",
  formatDetection: {
    email: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Devolympus Hackathon | The Ultimate Coding Experience",
    description: "Join Devolympus Hackathon - The ultimate coding experience",
    creator: "@deviatorsclub",
  },
  alternates: {
    canonical: "https://devolympus.deviatorsdce.tech/",
    languages: {
      "en-US": "https://devolympus.deviatorsdce.tech/",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
