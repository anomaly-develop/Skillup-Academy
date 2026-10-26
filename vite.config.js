import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages menyajikan repo ini dari subpath:
// https://anomaly-develop.github.io/Skillup-Academy/
// Jadi saat production build, semua aset harus diberi prefix /Skillup-Academy/.
// Di mode dev base tetap "/" supaya http://localhost:5173/ langsung jalan.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/Skillup-Academy/" : "/",
  plugins: [react(), tailwindcss()],
}));
