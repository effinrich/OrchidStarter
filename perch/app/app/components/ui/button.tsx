import { cva } from "styled-system/css"
import { styled } from "styled-system/jsx"

// Custom Park UI-style button — styled via Panda cva, never inline styles.
const button = cva({
  base: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontWeight: "bold", fontSize: "sm", borderRadius: "lg", px: "5", py: "2.5",
    cursor: "pointer", transition: "transform .2s, box-shadow .2s, background .2s",
    _hover: { transform: "translateY(-1px)" },
  },
  variants: {
    variant: {
      solid: { color: "white", bgGradient: "to-br", gradientFrom: "iris", gradientTo: "aqua", boxShadow: "0 10px 26px rgba(109,94,246,.45)" },
      glass: { color: "fg.default", bg: "rgba(255,255,255,0.08)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" },
    },
  },
  defaultVariants: { variant: "solid" },
})
export const Button = styled("button", button)
