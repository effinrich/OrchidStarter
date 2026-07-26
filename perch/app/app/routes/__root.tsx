import { createRootRoute, Outlet, Scripts, HeadContent } from "@tanstack/react-router"
import { css } from "styled-system/css"
import type { ReactNode } from "react"
import "../styles/globals.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Perch — give your site a voice" },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={css({ margin: 0, bg: "ink", color: "white", fontFamily: "body", minH: "100dvh" })}>
        {/* drifting aurora backdrop — shared across routes */}
        <div className={css({ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" })}>
          <div className={css({ position: "absolute", w: "460px", h: "460px", rounded: "full", bg: "iris", filter: "blur(90px)", opacity: 0.4, top: "-120px", left: "-80px", animation: "pdrift 16s ease-in-out infinite" })} />
          <div className={css({ position: "absolute", w: "520px", h: "520px", rounded: "full", bg: "aqua", filter: "blur(90px)", opacity: 0.35, top: "20%", right: "-140px", animation: "pdrift 18s ease-in-out infinite reverse" })} />
        </div>
        <div className={css({ position: "relative", zIndex: 1 })}>{children}</div>
        <Scripts />
      </body>
    </html>
  )
}
