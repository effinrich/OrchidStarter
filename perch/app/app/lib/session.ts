// Framework-agnostic: mint an ElevenLabs Conversational AI signed URL server-side.
// Env: ELEVENLABS_API_KEY, PERCH_DEFAULT_AGENT_ID (optional)
export async function getSignedUrl(agentId?: string): Promise<string> {
  const key = process.env.ELEVENLABS_API_KEY
  if (!key) throw new Error("Missing ELEVENLABS_API_KEY")
  const id = agentId || process.env.PERCH_DEFAULT_AGENT_ID
  if (!id) throw new Error("Missing agentId")
  const res = await fetch(
    "https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=" + encodeURIComponent(id),
    { headers: { "xi-api-key": key } }
  )
  if (!res.ok) throw new Error("ElevenLabs signed-url " + res.status)
  const data = (await res.json()) as { signed_url: string }
  return data.signed_url
}
