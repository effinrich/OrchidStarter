// Server-only. Mints a short-lived ElevenLabs Conversational AI signed URL so the
// API key NEVER reaches the browser. Deploy as a serverless function
// (Vercel/Netlify/Cloudflare). Frontend calls this via `data-session-url`.
//
// Env: ELEVENLABS_API_KEY
//
// Example (Vercel): export default async function handler(req, res) { ... }
export async function getSignedUrl(agentId) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error("Missing ELEVENLABS_API_KEY");

  // ElevenLabs Conversational AI: request a signed URL for the agent.
  const r = await fetch(
    "https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=" +
      encodeURIComponent(agentId),
    { headers: { "xi-api-key": key } }
  );
  if (!r.ok) throw new Error("ElevenLabs signed-url " + r.status);
  const data = await r.json(); // { signed_url }
  return data.signed_url;
}

// --- Vercel/Netlify-style handler ---
export default async function handler(req, res) {
  try {
    const agentId = (req.body && req.body.agentId) || "";
    // TODO: authenticate the request + rate-limit + meter usage for billing here.
    const signedUrl = await getSignedUrl(agentId);
    res.status(200).json({ signedUrl });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
}
