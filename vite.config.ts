import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  base: "./",
  plugins: [react(), sites()],
  build: { outDir: "dist", sourcemap: true },
});
