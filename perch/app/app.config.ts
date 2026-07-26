import { defineConfig } from "@tanstack/react-start/config"
import tsConfigPaths from "vite-tsconfig-paths"

// TanStack Start (NOT Next.js) — per project stack rules.
export default defineConfig({
  vite: {
    plugins: [tsConfigPaths({ projects: ["./tsconfig.json"] })],
  },
})
