import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "../globals.css";
import { LogoIcon } from "@/components/logo";

export const metadata = {
  title: {
    default: "CraftJS Documentation",
    template: "%s | CraftJS Docs",
  },
  description: "Documentation for CraftJS - The Open Source Next.js AI Boilerplate",
  icons: {
    icon: "/favicon.ico",
  },
};

const banner = (
  <Banner storageKey="craftjs-banner">
    ⭐ CraftJS is open source.{" "}
    <a href="https://github.com/craftfast/craftjs" target="_blank" rel="noopener noreferrer">
      Star on GitHub →
    </a>
  </Banner>
);

const navbar = (
  <Navbar
    logo={
      <span className="flex items-center gap-2 text-lg font-semibold">
        <LogoIcon size={24} />
        <span>
          <span className="text-neutral-900 dark:text-white">Craft</span>
          <span className="text-neutral-400">JS</span>
        </span>
      </span>
    }
    projectLink="https://github.com/craftfast/craftjs"
  >
    <a
      href="/"
      className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
    >
      ← Home
    </a>
  </Navbar>
);

const footer = (
  <Footer>
    <div className="flex w-full flex-col items-center sm:items-start">
      <p className="text-sm text-neutral-500">
        © {new Date().getFullYear()} CraftJS. MIT License.{" "}
        <a
          href="https://x.com/sudheerdotai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-700 hover:underline dark:text-neutral-300"
        >
          @sudheerdotai
        </a>
      </p>
    </div>
  </Footer>
);

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/craftfast/craftjs/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
