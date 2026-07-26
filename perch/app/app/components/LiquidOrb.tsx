import { css } from "styled-system/css"
import { liquidOrb } from "styled-system/recipes"

type Props = { size?: "sm" | "lg"; live?: boolean; label?: string; onClick?: () => void }

// Animated gradient orb with an internal conic shimmer (no inline styles).
export function LiquidOrb({ size = "lg", live = false, label, onClick }: Props) {
  return (
    <button className={liquidOrb({ size, live })} aria-label={label} onClick={onClick}>
      <span
        className={css({
          position: "absolute",
          inset: "-30%",
          bgGradient: "conic",
          gradientFrom: "iris",
          gradientTo: "aqua",
          filter: "blur(11px)",
          opacity: live ? 0.85 : 0,
          animation: "pspin 5s linear infinite",
          transition: "opacity .3s",
        })}
      />
      {label ? <span className={css({ position: "relative", zIndex: 1 })}>{label}</span> : null}
    </button>
  )
}
