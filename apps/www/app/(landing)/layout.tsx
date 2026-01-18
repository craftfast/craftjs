import "./landing.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CraftJS - Open Source Next.js AI Boilerplate",
  description:
    "Ship AI apps in days, not weeks. Open-source Next.js boilerplate with auth, payments, AI, and everything you need to launch.",
  keywords: [
    "nextjs boilerplate",
    "ai boilerplate",
    "open source",
    "saas starter",
    "next.js template",
    "free boilerplate",
  ],
  openGraph: {
    title: "CraftJS - Open Source Next.js AI Boilerplate",
    description: "Ship AI apps in days, not weeks. Open-source Next.js boilerplate.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftJS - Open Source Next.js AI Boilerplate",
    description: "Ship AI apps in days, not weeks. Open-source Next.js boilerplate.",
    creator: "@sudheerdotai",
  },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
