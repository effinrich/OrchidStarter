#!/usr/bin/env python3
"""Build Rich Tillman's ATS-safe resume, tailored for Mermaid's AI-First Frontend Engineer
role - owning Coral (Mermaid's design system), AI-augmented frontend dev, and Mermaid's
marketing/open-source web surfaces.
   python3 you/build-ats-resume-mermaid.py
Outputs /tmp/pdfout/Rich_Tillman_Resume_Mermaid.docx and you/resume-mermaid.html.
Does NOT touch the canonical you/resume-ats.html / build-ats-resume.py.
ATS rules: single column, black, Arial, dates on own line, no tables/color. (see CLAUDE.md)
Why tailored: JD asks for design-system architecture (component libraries, design tokens,
theming, docs - explicitly building on Shadcn), Figma/prototyping fluency to reduce
dependency on detailed specs, AI-augmented development as a daily practice not a checkbox,
and accessible/performant marketing + open-source web surfaces. ForgeKit (Figma-to-React-
to-Storybook, design-token extraction, AI-driven design-to-code) is close to a literal
match for the role mission, on top of two real, shipped design systems (Freebird 200+
components, Redesign Health 50+ components/30% dev-time reduction).
"""
import zipfile, html, os
def esc(t): return html.escape(t, quote=False)

NAME="RICH TILLMAN"; TITLE="AI-First Frontend Engineer"
CONTACT="Elizabethton, TN | 843-834-0041 | richtillman@pm.me | linkedin.com/in/effinrich | github.com/effinrich | richtillman.xyz"
SUMMARY=("AI-First Frontend Engineer, 15 years, with a career built around the exact problem Coral needs to solve: scalable, "
 "elegant design systems that hold up across teams. For the past year I've built ForgeKit, an open-source CLI + MCP server "
 "suite that bridges Figma to React to Storybook, extracts design tokens, and generates typed theme configs for Tailwind, "
 "Chakra, and shadcn/ui - AI-driven design-to-code tooling built specifically to prevent the token drift this role exists "
 "to stop. That sits on top of two real, shipped design systems: a 200-component React/Storybook library at Freebird "
 "spanning B2B, B2C, and React Native (no separate iOS/Android teams needed), and a 50+ component system at Redesign "
 "Health adopted org-wide for a 30% dev-time reduction. I live in the Figma-to-code workflow daily via Figma Code Connect "
 "and move from a Figma file straight into working components without waiting on a fully-specced handoff. Genuinely "
 "AI-native: Claude Code and Cursor in daily production use (including Cursor's background agent), author of production "
 "MCP servers rather than just a consumer of AI tools. Accessibility and performance discipline to match (WCAG 2.1 AA, "
 "Lighthouse 100 across recent projects), and a habit of shipping side work as public, documented open source.")
JOBS=[
 ("Consultant, AI Model Evaluation & Red-Teaming","Independent (Mercor, micro1, Handshake)","Feb 2026 - Jul 2026",None,[
   "Evaluated, ranked, and red-teamed frontier AI model outputs against scoring rubrics on React/TypeScript frontend-engineering tasks across three sequential contract engagements (Mercor, then micro1, then Handshake); authored adversarial test cases to expose model failure modes and break outputs. Worked in ChatGPT Pro and Cursor across four frontier LLMs throughout."]),
 ("Staff Frontend Engineer & Tech Lead to Engineering Director","Redesign Health","Jul 2022 - May 2024",None,[
   "Promoted twice to Engineering Director; led delivery across three cross-functional teams (15+ members) while staying hands-on as a frontend architecture SME.",
   "Spearheaded a React design system of 50+ reusable components (Storybook + Chromatic) adopted across teams: 30% dev-time reduction across a 10-15 engineer org.",
   "Engineered 20+ data-visualization components with custom hooks and Zustand: 40% rendering-overhead reduction on large datasets; established a Chromatic visual-regression workflow.",
   "Adopted Ponicode for AI-generated React unit-test scaffolding, raising test coverage on new components with less manual boilerplate.",
   "Built an onboarding methodology that trained backend engineers to production-level React in one month.",
   "Drove build-tooling modernization: migrated to Vite (became the org's default bundler by early 2023) and to Tailwind CSS for an internal sister app to the client portal; migrated the team's default e2e suite from Cypress to Playwright; generated type-safe React Query hooks from OpenAPI/Swagger specs; collaborated with backend on JWT auth and authored the specs for an OIDC migration that was shelved when the team was restructured."]),
 ("Senior Frontend Engineer & Tech Lead","Pineapple Corporation","Jan 2022 - Jul 2022",None,[
   "Architected Nx monorepo with a design system based shared UI library, a cross-platform (iOS, Android, web) application, and a NestJS backend.",
   "Built cross-platform architecture with Expo, Nx, and React Native (25% mobile performance gain for 100K+ users)."]),
 ("Founding Frontend Engineer","PHC Global","Jul 2021 - Jan 2022",None,[
   "Founding frontend architect for a healthtech/biosecurity startup: built the core product for enterprise clients (including Facebook and Amex, our first two customers) - a Mapbox GL heatmap of active COVID risk zones that clients used to schedule ground teams, plus flight/travel-arrangement suggestions and a separate interactive map for simulating alternate entry routes.",
   "Set up the foundational architecture: Nx monorepo with 30+ shared libraries and gRPC middleware (40% developer-experience improvement); lifted NPS-measured satisfaction 35%; cut infrastructure costs 30% via GCP, gRPC, and Kubernetes.",
   "Standardized client state with Redux Toolkit (RTK) and server state with React Query across the platform."]),
 ("Lead Frontend Engineer","Freebird","Sep 2016 - Jan 2021",None,[
   "Built one of the earliest production React UI libraries on Storybook: a 200-component design system spanning B2B, B2C, and React Native, eliminating the need for separate iOS and Android teams.",
   "Migrated the team's Redux + Redux-Saga boilerplate to Redux Toolkit (RTK) in 2019, cutting state-management boilerplate and standardizing patterns across the design system.",
   "Served as design-engineering liaison across client, sales, and marketing; shipped B2B/B2C and internal dashboards (React, NestJS, D3.js) and a React Native app with real-time data views."]),
 ("Lead Web Developer","FaceCake Marketing Technologies","Oct 2010 - Sep 2016","Los Angeles, CA",[
   "Pioneered browser-based AR try-on for NARS, one of the first of its kind: compiled OpenCV to JavaScript via Emscripten for real-time client-side computer vision over getUserMedia, with Pixi.js, WebGL, and Three.js powering real-time face-tracking and makeup-rendering. Worked directly with Pixi.js's creator on techniques no one had attempted before, years ahead of mainstream WebAR.",
   "Shipped the NARS virtual try-on web app (~$400K/month revenue lift) backed by a real-time CMS on Firebase Realtime Database; owned the full lifecycle end-to-end."]),
]
PROJECTS=[
 ("ForgeKit - independent open-source developer-tooling venture (2024 - 2026)",
  "Open-source CLI + MCP server suite bridging Figma to React to Storybook for design-system teams - itself a harness/spec-tooling product for AI coding agents (Claude Code, Cursor). 6,200+ npm installs across three separate first-time package releases, with active production adoption. forgekit.cloud, github.com/effinrich, npmjs.com."),
 ("ForgeKit Figma MCP (npmjs.com)",
  "MCP server extracting Figma variables and design tokens; generates typed theme configs for Chakra UI, Tailwind, and shadcn - enabling AI-driven design-to-code workflows and preventing token drift between design and implementation."),
 ("ForgeKit Core CLI (forgekit.cloud)",
  "TypeScript CLI scaffolding production-ready Nx monorepos with React 18, Storybook 10+, Vitest, Playwright, and GitHub Actions CI/CD; targets Chakra UI, shadcn/ui, and Tamagui across web and universal React Native. Used recursively to scaffold ForgeKit itself."),
 ("ForgeKit Storybook MCP (npmjs.com)",
  "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents - automating story generation, docs scaffolding, and component-testing workflows. Direct, hands-on experience designing what context an AI agent needs to do a task correctly."),
 ("TokenCast (tokencast.vercel.app)",
  "Paste design tokens (Figma variables, CSS custom properties, or a Tailwind config) and get a live preview plus exportable theme code for Tailwind, Chakra, and shadcn/ui, with server-rendered Save & Share links. Built with Cursor. React Router (framework mode: SSR, loaders, actions), React 19, TypeScript, Tailwind CSS 4, Supabase (RLS + SECURITY DEFINER RPCs, IP rate-limiting), Vitest + Playwright; Lighthouse 100 accessibility, 99 performance."),
 ("MCP Atlas (mcp-atlas-orcin.vercel.app)",
  "Curated, link-verified directory of Model Context Protocol servers (18 official + community, searchable and filterable), built and maintained as public open source. Built with Claude Code. Astro (Zod-validated content collections + islands architecture), TypeScript, Vitest, and Playwright; Lighthouse 100 accessibility, 97 performance."),
 ("Tidy App (tidyapp.me)",
  "Offline-first React Native + Expo app; Zustand + TanStack Query; Supabase; Figma Code Connect; 90% test coverage. Built with both Claude Code and Cursor, including production use of Cursor's background agent (verified via git co-author trailers on merged PRs)."),
 ("Perch - open-source voice-assistant widget",
  "Drop-in voice AI for any website (one script tag + React SDK) built on ElevenLabs Conversational AI: dependency-free Shadow-DOM core, React SDK, and a serverless signed-URL proxy that keeps the API key server-side. Built end-to-end with Claude Code."),
 ("Santa Chat AI - AI-powered Santa Claus experience",
  "Real-time chat, live phone calls, and SMS with Santa via ElevenLabs text-to-speech and Twilio, an LLM chat backend, and Stable Diffusion image generation; Stripe-based subscription tokens. Selected by ElevenLabs for a 300K-token grant. Next.js, React, Chakra UI, Zustand, MongoDB, NextAuth."),
 ("Textation - AI character chat and avatar platform",
  "Pivoted from Santa Chat AI into a general AI-companion product: custom AI characters with LLM chat, ElevenLabs text-to-speech, Deepgram speech-to-text, image generation, SadTalker talking-head video, and live WebSocket voice chat; Stripe payments, Twilio SMS/voice. Next.js, React, Chakra UI, Zustand, MongoDB."),
]
SKILLS=[
 ("Languages","JavaScript (15 yrs), TypeScript (strict), HTML5, CSS3, SQL, PHP (legacy)"),
 ("Design Systems & Headless UI","Storybook 10+, Chromatic, shadcn/ui, Radix UI, Ark UI, Chakra UI, Tamagui, Tailwind CSS, Styled Components / CSS-in-JS, Figma Code Connect, design tokens & theming"),
 ("Agentic AI Development","Model Context Protocol (MCP) - author production MCP servers, not just a consumer; Claude Code and Cursor (including Cursor's background/autonomous agent) in daily production use; ChatGPT Pro; AI model evaluation & red-teaming across frontier LLMs"),
 ("Frameworks & Libraries","React 19, Next.js, React Native, Expo, TanStack Start, Node.js / NestJS, React Hooks, Concurrent Rendering"),
 ("Build Tools & DevOps","Vite, Nx, Turborepo, pnpm workspaces, Module Federation, Oxlint, GitHub Actions CI/CD, EAS Build, GCP, Kubernetes, gRPC"),
 ("Testing & Accessibility","Playwright, Cypress, Vitest, Jest, React Testing Library, WCAG 2.1 AA"),
 ("APIs & Data","REST, GraphQL, tRPC, OpenAPI/Swagger (client & hook codegen), JWT, Redux Toolkit, Zustand, TanStack Query, Supabase, PostgreSQL, Context API"),
 ("Graphics & Real-Time Rendering","Pixi.js, WebGL, Three.js, Emscripten (C++ to JS/WASM), OpenCV, real-time client-side computer vision"),
]

def h(s): return esc(s)
P=[f'<div class="name">{h(NAME)}</div>',f'<div class="title">{h(TITLE)}</div>',f'<div class="contact">{h(CONTACT)}</div>','<h2>Summary</h2>',f'<p>{h(SUMMARY)}</p>','<h2>Experience</h2>']
for t,co,d,loc,bl in JOBS:
    P.append(f'<p class="role"><b>{h(t)} &mdash; {h(co)}</b>{" ("+h(loc)+")" if loc else ""}</p>'); P.append(f'<p class="dates">{h(d)}</p>')
    P.append('<ul>'+''.join(f'<li>{h(b)}</li>' for b in bl)+'</ul>')
P.append('<h2>Projects</h2>')
for n,d in PROJECTS: P.append(f'<p class="proj"><b>{h(n)}</b> &mdash; {h(d)}</p>')
P.append('<h2>Technical Skills</h2>')
for c,i in SKILLS: P.append(f'<p class="skill"><b>{h(c)}:</b> {h(i)}</p>')
CSS="""<style>@page{margin:0.6in 0.7in;}body{font-family:Arial,Helvetica,sans-serif;font-size:10.5pt;color:#000;line-height:1.34;margin:0;}
.name{font-size:19pt;font-weight:bold;}.title{font-size:12pt;margin:1pt 0 3pt;}.contact{font-size:9.5pt;margin-bottom:4pt;}
h2{font-size:11pt;font-weight:bold;text-transform:uppercase;border-bottom:1px solid #000;padding-bottom:2pt;margin:12pt 0 5pt;}
.role{margin:7pt 0 0;}.dates{margin:0 0 2pt;font-size:9.5pt;}ul{margin:2pt 0 0;padding-left:16pt;}li{margin-bottom:2.5pt;}
p{margin:0 0 4pt;}.proj,.skill{margin:0 0 5pt;}</style>"""
here=os.path.dirname(os.path.abspath(__file__))
open(os.path.join(here,"resume-mermaid.html"),'w').write("<!DOCTYPE html><html><head><meta charset='utf-8'>"+CSS+"</head><body>"+''.join(P)+"</body></html>")

def rune(t,b=False,sz=21): return f'<w:r><w:rPr>{"<w:b/>" if b else ""}<w:sz w:val="{sz}"/></w:rPr><w:t xml:space="preserve">{esc(t)}</w:t></w:r>'
def para(r,after=100,bullet=False,before=0):
    ppr='<w:pPr>'+('<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:ind w:left="360" w:hanging="360"/>' if bullet else '')+f'<w:spacing w:before="{before}" w:after="{after}" w:line="264" w:lineRule="auto"/></w:pPr>'
    return f'<w:p>{ppr}{r}</w:p>'
def hd(t): return ('<w:p><w:pPr><w:spacing w:before="200" w:after="70"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="000000"/></w:pBdr></w:pPr>'+f'<w:r><w:rPr><w:b/><w:caps/><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">{esc(t)}</w:t></w:r></w:p>')
B=[f'<w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="38"/></w:rPr><w:t>{esc(NAME)}</w:t></w:r></w:p>',para(rune(TITLE,sz=24),after=40),para(rune(CONTACT,sz=19),after=60),hd("Summary"),para(rune(SUMMARY,sz=21)),hd("Experience")]
for t,co,d,loc,bl in JOBS:
    B.append(para(rune(f"{t} - {co}",b=True,sz=21)+(rune(" ("+loc+")",sz=21) if loc else ""),after=20,before=120)); B.append(para(rune(d,sz=19),after=40))
    for b in bl: B.append(para(rune(b,sz=21),bullet=True,after=50))
B.append(hd("Projects"))
for n,d in PROJECTS: B.append(para(rune(n+" - ",b=True,sz=21)+rune(d,sz=21),after=60))
B.append(hd("Technical Skills"))
for c,i in SKILLS: B.append(para(rune(c+": ",b=True,sz=21)+rune(i,sz=21),after=50))
document='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+''.join(B)+'<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="864" w:right="1008" w:bottom="864" w:left="1008"/></w:sectPr></w:body></w:document>'
CT='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/></Types>'
RELS='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
DR='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>'
ST='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="000000"/></w:rPr></w:rPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>'
NUM='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="&#8226;"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>'
os.makedirs("/tmp/pdfout",exist_ok=True)
out='/tmp/pdfout/Rich_Tillman_Resume_Mermaid.docx'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml',CT); z.writestr('_rels/.rels',RELS); z.writestr('word/document.xml',document)
    z.writestr('word/_rels/document.xml.rels',DR); z.writestr('word/styles.xml',ST); z.writestr('word/numbering.xml',NUM)
import xml.etree.ElementTree as ET; ET.fromstring(document)
print("built docx + html; projects:", len(PROJECTS))
