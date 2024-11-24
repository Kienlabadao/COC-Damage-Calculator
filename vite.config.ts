import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import Node's path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map 'components' to the src/components folder
      components: path.resolve(__dirname, "./src/components"),
      assets: path.resolve(__dirname, "./src/assets"),
      hooks: path.resolve(__dirname, "./src/hooks"),
    },
  },
});
