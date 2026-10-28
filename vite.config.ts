import { defineConfig, loadEnv } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { SEO } from "./src/content";

const escapeAttribute = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const contentSeo: Plugin = {
  name: "content-seo",
  transformIndexHtml(html) {
    return html
      .replace("<title></title>", `<title>${escapeAttribute(SEO.title)}</title>`)
      .replace(
        '<meta name="description" content="" />',
        `<meta name="description" content="${escapeAttribute(SEO.description)}" />`,
      )
      .replace(
        '<meta property="og:title" content="" />',
        `<meta property="og:title" content="${escapeAttribute(SEO.openGraphTitle)}" />`,
      )
      .replace(
        '<meta property="og:description" content="" />',
        `<meta property="og:description" content="${escapeAttribute(SEO.openGraphDescription)}" />`,
      )
      .replace(
        '<meta property="og:type" content="" />',
        `<meta property="og:type" content="${escapeAttribute(SEO.openGraphType)}" />`,
      );
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const base = env.VITE_GITHUB_PAGES === "true" ? "/why-deluxe/" : "/";

  return {
    base,
    plugins: [react(), contentSeo],
  };
});
