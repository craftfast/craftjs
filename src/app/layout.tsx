import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CraftJS - Build AI Apps Faster",
    template: "%s | CraftJS",
  },
  description:
    "An opinionated Next.js boilerplate for building AI-powered applications. Features authentication, payments, AI chat, and more.",
  keywords: [
    "Next.js",
    "AI",
    "Boilerplate",
    "SaaS",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "CraftJS" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CraftJS",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-screen antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
