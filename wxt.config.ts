import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "wxt";
import { EXTENSION_VERSION } from "./lib/extension-version";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// See https://wxt.dev/api/config.html
// Match https://github.com/wxt-dev/examples/tree/main/examples/react-shadcn — Tailwind via @tailwindcss/vite only.
// Vite default base "/" resolves assets under chrome-extension://…/chunks and …/assets.
// Shadcn CLI still needs matching `paths` in root tsconfig.json.
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    version: EXTENSION_VERSION,
    name: "Manex — Extension Manager & Exporter",
    short_name: "Manex",
    description:
      "See every extension you have installed. Save a simple file you can open in your browser, and use the dashboard for more tools.",
    action: {
      default_title: "Manex",
    },
    permissions: ["management"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "."),
      },
    },
  }),
});
