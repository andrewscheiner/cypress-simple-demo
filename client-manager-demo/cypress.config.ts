import { defineConfig } from "cypress";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "vite",
      viteConfig: {
        plugins: [angular()],
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
