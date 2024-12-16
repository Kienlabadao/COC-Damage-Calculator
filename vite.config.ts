import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import Node's path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map 'components' to the src/components folder
      actions: path.resolve(__dirname, "./src/actions"),
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      config: path.resolve(__dirname, "./src/config"),
      data: path.resolve(__dirname, "./src/data"),
      features: path.resolve(__dirname, "./src/features"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      objects: path.resolve(__dirname, "./src/objects"),
      pages: path.resolve(__dirname, "./src/pages"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
