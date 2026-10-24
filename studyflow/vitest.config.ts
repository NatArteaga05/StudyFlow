import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const projectDirectory = fileURLToPath(new URL(".", import.meta.url));
const repositoryDirectory = resolve(projectDirectory, "..");

export default mergeConfig(
  viteConfig,
  defineConfig({
    root: repositoryDirectory,
    server: {
      fs: {
        allow: [repositoryDirectory, projectDirectory]
      }
    },
    resolve: {
      alias: [
        {
          find: /^@testing-library\/react$/,
          replacement: resolve(projectDirectory, "node_modules/@testing-library/react/dist/index.js")
        },
        {
          find: /^@testing-library\/jest-dom\/vitest$/,
          replacement: resolve(projectDirectory, "node_modules/@testing-library/jest-dom/dist/vitest.mjs")
        },
        {
          find: /^vitest$/,
          replacement: resolve(projectDirectory, "node_modules/vitest/dist/index.js")
        },
        {
          find: /^react\/jsx-dev-runtime$/,
          replacement: resolve(projectDirectory, "node_modules/react/jsx-dev-runtime.js")
        },
        {
          find: /^react\/jsx-runtime$/,
          replacement: resolve(projectDirectory, "node_modules/react/jsx-runtime.js")
        },
        {
          find: /^fake-indexeddb(?:\/(.*))?$/,
          replacement: resolve(projectDirectory, "node_modules/fake-indexeddb") + "/$1"
        }
      ]
    },
    test: {
      environment: "jsdom",
      globals: true,
      include: ["tests/**/*.test.{ts,tsx}"]
    }
  })
);
