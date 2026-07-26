// POST /api/perch/session  ->  { signedUrl }
// Mints a short-lived ElevenLabs signed URL. The API key stays server-side.
// Env: ELEVENLABS_API_KEY  (required)
//      PERCH_DEFAULT_AGENT_ID  (optional fallback if the widget sends none)
//      PERCH_ALLOWED_ORIGINS   (optional CSV allowlist; default "*")
export default async function handler(req, res) {
  var allowed = (process.env.PERCH_ALLOWED_ORIGINS || "*").split(",").map(function (s) { return s.trim(); });
  var origin = req.headers.origin || "";
  res.setHeader("Access-Control-Allow-Origin",
    allowed.indexOf("*") > -1 ? "*" : (allowed.indexOf(origin) > -1 ? origin : (allowed[0] || "")));
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }

  var key = process.env.ELEVENLABS_API_KEY;
  if (!key) { res.status(500).json({ error: "Missing ELEVENLABS_API_KEY" }); return; }

  var agentId = (req.body && req.body.agentId) || process.env.PERCH_DEFAULT_AGENT_ID || "";
  if (!agentId) { res.status(400).json({ error: "Missing agentId" }); return; }

  // TODO before launch: authenticate the caller, rate-limit, and meter usage for billing.
  try {
    var r = await fetch(
      "https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=" + encodeURIComponent(agentId),
      { headers: { "xi-api-key": key } }
    );
    if (!r.ok) { res.status(502).json({ error: "elevenlabs " + r.status }); return; }
    var data = await r.json(); // { signed_url }
    res.status(200).json({ signedUrl: data.signed_url });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
}
