import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CraftJS - Free & Open Source Next.js AI App Boilerplate",
    template: "%s | CraftJS",
  },
  description:
    "Ship your AI apps in days, not weeks. A completely free and open-source Next.js boilerplate with authentication, payments, AI integration, and more.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
