import { defineConfig } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"
import violet from "@park-ui/panda-preset/colors/violet"
import sand from "@park-ui/panda-preset/colors/sand"

// Perch design system — Park UI foundation + liquid-glass tokens, keyframes, recipes.
// Regenerate `styled-system/` with:  panda codegen
export default defineConfig({
  preflight: true,
  presets: [createPreset({ accentColor: violet, grayColor: sand, radius: "xl" })],
  include: ["./app/**/*.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          iris: { value: "#6D5EF6" },
          aqua: { value: "#22C1C3" },
          ink: { value: "#0b0d1a" },
        },
      },
      keyframes: {
        pfloat: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        pspin: { to: { transform: "rotate(360deg)" } },
        ppulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(109,94,246,.5)" },
          "70%": { boxShadow: "0 0 0 22px rgba(109,94,246,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(109,94,246,0)" },
        },
        pdrift: { "0%,100%": { transform: "translate(0,0)" }, "50%": { transform: "translate(32px,22px)" } },
        pbounce: { "0%,100%": { height: "6px" }, "50%": { height: "22px" } },
      },
      recipes: {
        glassPanel: {
          className: "glassPanel",
          description: "Frosted glass surface",
          base: {
            bg: "rgba(255,255,255,0.06)",
            borderWidth: "1px",
            borderColor: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(18px) saturate(160%)",
            borderRadius: "2xl",
            boxShadow: "0 24px 60px rgba(0,0,0,.30)",
          },
          variants: {
            tone: {
              light: { bg: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.65)", color: "ink" },
            },
          },
        },
        liquidOrb: {
          className: "liquidOrb",
          description: "Animated gradient orb",
          base: {
            position: "relative",
            display: "grid",
            placeItems: "center",
            borderRadius: "full",
            color: "white",
            bgGradient: "to-br",
            gradientFrom: "iris",
            gradientTo: "aqua",
            boxShadow: "0 12px 32px rgba(109,94,246,.4)",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform .25s cubic-bezier(.2,.8,.2,1)",
            _hover: { transform: "scale(1.06)" },
          },
          variants: {
            size: {
              sm: { w: "16", h: "16" },
              lg: { w: "24", h: "24" },
            },
            live: { true: { animation: "ppulse 1.6s ease-out infinite" } },
          },
          defaultVariants: { size: "lg" },
        },
      },
    },
  },
})
