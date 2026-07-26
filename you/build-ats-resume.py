#!/usr/bin/env python3
"""Build Rich Tillman's ATS-safe resume (docx + html). Edit the data below, then:
   python3 you/build-ats-resume.py
Outputs /tmp/pdfout/Rich_Tillman_Resume_ATS.docx and you/resume-ats.html.
ATS rules: single column, black, Arial, dates on own line, no tables/color. (see CLAUDE.md)
"""
import zipfile, html, os
def esc(t): return html.escape(t, quote=False)

NAME="RICH TILLMAN"; TITLE="Principal Frontend Engineer"
CONTACT="Elizabethton, TN | 843-834-0041 | richtillman@pm.me | linkedin.com/in/effinrich | github.com/effinrich | richtillman.xyz"
SUMMARY=("Principal Frontend Engineer with 15 years building production UI systems, specializing in React/TypeScript design "
 "systems and Storybook-driven development. Creator of ForgeKit, an open-source CLI + MCP server suite bridging Figma to "
 "React (5,700+ npm installs). IC to Engineering Director across five 0-to-1 startups. Ships products end-to-end, "
 "frontend-deep and self-sufficient across the stack. Seeking Principal / Senior Frontend, Product Engineer, and "
 "design-systems / developer-tooling roles.")
JOBS=[
 ("Frontend Engineer, AI Evaluation & Red-Teaming (Contract)","Handshake","Jun 2026 - Jul 2026",None,[
   "Assessed real-world code quality and red-teamed AI models on frontend/React engineering tasks, authoring adversarial cases to break model outputs and surface failure modes."]),
 ("Frontend Engineer, AI Model Evaluation (Contract)","micro1","Apr 2026 - May 2026",None,[
   "Ranked and scored AI model outputs against evaluation rubrics on React/TypeScript coding tasks, with adversarial testing to expose model weaknesses."]),
 ("Frontend Engineer, AI Model Evaluation (Contract)","Mercor","Feb 2026 - Mar 2026",None,[
   "Evaluated and ranked AI model outputs against scoring rubrics on advanced frontend/React tasks; probed models with adversarial cases to surface failure modes."]),
 ("Staff Frontend Engineer & Tech Lead to Engineering Director","Redesign Health","Jul 2022 - May 2024",None,[
   "Promoted twice to Engineering Director; led delivery across three cross-functional teams (15+ members) while staying hands-on as a frontend architecture SME.",
   "Spearheaded a React design system of 50+ reusable components (Storybook + Chromatic) adopted across teams: 30% dev-time reduction across a 10-15 engineer org.",
   "Engineered 20+ data-visualization components with custom hooks and Zustand: 40% rendering-overhead reduction on large datasets; established a Chromatic visual-regression workflow.",
   "Built an onboarding methodology that trained backend engineers to production-level React in one month."]),
 ("Senior Frontend Engineer & Tech Lead","Pineapple Corporation","Jan 2022 - Jul 2022",None,[
   "Architected an Nx monorepo with shared libraries across 8+ applications (35% version-control efficiency gain); Storybook + Chromatic workflow for 60+ components; standardized state with Redux Toolkit.",
   "Built cross-platform architecture with Expo, Nx, and React Native (25% mobile performance gain for 100K+ users)."]),
 ("Founding Frontend Engineer","PHC Global","Jul 2021 - Jan 2022",None,[
   "Set the foundational frontend architecture for a B2B fintech dashboard: Nx monorepo with 30+ shared libraries and gRPC middleware (40% developer-experience improvement); lifted NPS-measured satisfaction 35%; cut infrastructure costs 30% via GCP, gRPC, and Kubernetes."]),
 ("Lead Frontend Engineer","Freebird","Sep 2016 - Jan 2021",None,[
   "Built one of the earliest production React UI libraries on Storybook: a 200-component design system spanning B2B, B2C, and React Native, eliminating the need for separate iOS and Android teams.",
   "Served as design-engineering liaison across client, sales, and marketing; shipped B2B/B2C and internal dashboards (React, NestJS, D3.js) and a React Native app with real-time data views."]),
 ("Lead Web Developer","FaceCake Marketing Technologies","Oct 2010 - Sep 2016","Los Angeles, CA",[
   "Pioneered browser-based AR try-on for NARS: compiled OpenCV to JavaScript via Emscripten for real-time client-side computer vision over getUserMedia, years before mainstream WebAR.",
   "Shipped the NARS virtual try-on web app (~$400K/month revenue lift) backed by a real-time CMS on Firebase Realtime Database; owned the full lifecycle end-to-end."]),
]
PROJECTS=[
 ("ForgeKit - independent open-source developer-tooling venture (2024 - 2026)",
  "Open-source CLI + MCP server suite bridging Figma to React to Storybook for design-system teams. 5,700+ npm installs with active production adoption. forgekit.cloud, github.com/effinrich, npmjs.com."),
 ("ForgeKit Core CLI (forgekit.cloud)",
  "TypeScript CLI scaffolding production-ready Nx monorepos with React 18, Storybook 10+, Vitest, Playwright, and GitHub Actions CI/CD; targets Chakra UI, shadcn/ui, and Tamagui across web and universal React Native. Used recursively to scaffold ForgeKit itself."),
 ("ForgeKit Figma MCP (npmjs.com)",
  "MCP server extracting Figma variables and design tokens; generates typed theme configs for Chakra UI, Tailwind, and shadcn - enabling AI-driven design-to-code workflows."),
 ("ForgeKit Storybook MCP (npmjs.com)",
  "MCP server exposing Storybook metadata, argTypes, and usage patterns to AI coding agents - automating story generation, docs scaffolding, and component-testing workflows."),
 ("Perch - open-source voice-assistant widget",
  "Drop-in voice AI for any website (one script tag + React SDK) built on ElevenLabs Conversational AI: dependency-free Shadow-DOM core, React SDK, and a serverless signed-URL proxy that keeps the API key server-side."),
 ("MCP Atlas (mcp-atlas-orcin.vercel.app)",
  "Curated, link-verified directory of Model Context Protocol servers (18 official + community, searchable and filterable). Built with Astro (Zod-validated content collections + islands architecture), TypeScript, Vitest, and Playwright; Lighthouse 100 accessibility, 97 performance."),
 ("TokenCast (tokencast.vercel.app)",
  "Paste design tokens (Figma variables, CSS custom properties, or a Tailwind config) and get a live preview plus exportable theme code for Tailwind, Chakra, and shadcn/ui, with server-rendered Save & Share links. React Router (framework mode: SSR, loaders, actions), React 19, TypeScript, Tailwind CSS 4, Supabase (RLS + SECURITY DEFINER RPCs, IP rate-limiting), Vitest + Playwright; Lighthouse 100 accessibility, 99 performance."),
 ("Tidy App (tidyapp.me)",
  "Offline-first React Native + Expo app; Zustand + TanStack Query; Supabase; Figma Code Connect; 90% test coverage."),
 ("COVID-19 Hotspot Mapping",
  "Interactive thermal-style heat maps of COVID-19 hotspots and zones built on Mapbox GL, turning geospatial case data into a clear public-health visualization."),
]
SKILLS=[
 ("Languages","JavaScript (15 yrs), TypeScript (strict), HTML5, CSS3, SQL, PHP (legacy)"),
 ("Frameworks & Libraries","React 19, Next.js, React Native, Expo, TanStack Start, Node.js / NestJS, React Hooks, Concurrent Rendering"),
 ("Design Systems & Tools","Storybook 10+, Chromatic, Chakra UI, shadcn/ui, Tamagui, Ark UI, Radix UI, Styled Components / CSS-in-JS, Figma Code Connect"),
 ("AI & Tooling","Model Context Protocol (MCP), Claude Code, Cursor, Figma MCP, AI model evaluation & red-teaming"),
 ("DevOps & Monorepo","Nx, Turborepo, pnpm workspaces, Module Federation, GitHub Actions, EAS Build, GCP, Kubernetes, gRPC"),
 ("State & Data","Redux Toolkit, Zustand, TanStack Query, REST, GraphQL, tRPC, Supabase, PostgreSQL, Context API"),
 ("Testing & Accessibility","Vitest, Jest, Playwright, React Testing Library, WCAG 2.1 AA"),
]

def h(s): return esc(s)
P=[f'<div class="name">{h(NAME)}</div>',f'<div class="title">{h(TITLE)}</div>',f'<div class="contact">{h(CONTACT)}</div>','<h2>Summary</h2>',f'<p>{h(SUMMARY)}</p>','<h2>Experience</h2>']
for t,co,d,loc,bl in JOBS:
    P.append(f'<p class="role"><b>{h(t)} &mdash; {h(co)}</b></p>'); P.append(f'<p class="dates">{h(d+(" | "+loc if loc else ""))}</p>')
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
open(os.path.join(here,"resume-ats.html"),'w').write("<!DOCTYPE html><html><head><meta charset='utf-8'>"+CSS+"</head><body>"+''.join(P)+"</body></html>")

def rune(t,b=False,sz=21): return f'<w:r><w:rPr>{"<w:b/>" if b else ""}<w:sz w:val="{sz}"/></w:rPr><w:t xml:space="preserve">{esc(t)}</w:t></w:r>'
def para(r,after=100,bullet=False,before=0):
    ppr='<w:pPr>'+('<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:ind w:left="360" w:hanging="360"/>' if bullet else '')+f'<w:spacing w:before="{before}" w:after="{after}" w:line="264" w:lineRule="auto"/></w:pPr>'
    return f'<w:p>{ppr}{r}</w:p>'
def hd(t): return ('<w:p><w:pPr><w:spacing w:before="200" w:after="70"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="000000"/></w:pBdr></w:pPr>'+f'<w:r><w:rPr><w:b/><w:caps/><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">{esc(t)}</w:t></w:r></w:p>')
B=[f'<w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="38"/></w:rPr><w:t>{esc(NAME)}</w:t></w:r></w:p>',para(rune(TITLE,sz=24),after=40),para(rune(CONTACT,sz=19),after=60),hd("Summary"),para(rune(SUMMARY,sz=21)),hd("Experience")]
for t,co,d,loc,bl in JOBS:
    B.append(para(rune(f"{t} - {co}",b=True,sz=21),after=20,before=120)); B.append(para(rune(d+(" | "+loc if loc else ""),sz=19),after=40))
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
out='/tmp/pdfout/Rich_Tillman_Resume_ATS.docx'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml',CT); z.writestr('_rels/.rels',RELS); z.writestr('word/document.xml',document)
    z.writestr('word/_rels/document.xml.rels',DR); z.writestr('word/styles.xml',ST); z.writestr('word/numbering.xml',NUM)
import xml.etree.ElementTree as ET; ET.fromstring(document)
print("built docx + html; projects:", len(PROJECTS))
