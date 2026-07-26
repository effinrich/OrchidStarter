# Deploy Perch (site + live session endpoint)

`apps/site/` deploys as a static site **plus** one serverless function
(`api/perch/session.js`). Fastest path is Vercel.

## Vercel (recommended)
1. `npm i -g vercel` (once).
2. From `apps/site/`:  `vercel`  (link/create the project; set **root** to this folder).
3. Add environment variables (Vercel dashboard → Settings → Environment Variables):
   - `ELEVENLABS_API_KEY` — your key (required).
   - `PERCH_DEFAULT_AGENT_ID` — your `agent_…` id (so the landing's widget just works).
   - `PERCH_ALLOWED_ORIGINS` — optional CSV of allowed origins (e.g. `https://perch.app`).
4. `vercel --prod`. Your live URL serves the page; the orb hits `/api/perch/session`.

Local preview **with voice**: `vercel dev` (runs the function locally over http;
mic works on `localhost`).

## What makes it talk
- The widget POSTs to `/api/perch/session` → function mints a signed URL from
  `GET /v1/convai/conversation/get_signed_url` → widget runs the live WebRTC session.
- **HTTPS required** for the mic (Vercel gives you HTTPS automatically).

## Before you share the URL
- Set `PERCH_ALLOWED_ORIGINS` to your domain(s) so others can't burn your quota.
- Update `og:image` / `og:url` to absolute URLs once you have the domain (social previews).
- Rate-limit + meter the function (it starts billable conversations).

## Netlify alternative
Deploy `apps/site` as the publish dir and move `api/perch/session.js` to
`netlify/functions/session.js` (Netlify's handler signature differs slightly —
`export async function handler(event){…}`). Point the widget at `/.netlify/functions/session`.
