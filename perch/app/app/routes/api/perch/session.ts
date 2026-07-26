import { createServerFileRoute } from "@tanstack/react-start/server"
import { json } from "@tanstack/react-start"
import { getSignedUrl } from "~/lib/session"

// POST /api/perch/session -> { signedUrl }
// NOTE: TanStack Start's server-route helper name has shifted across versions
// (createServerFileRoute / createAPIFileRoute). If your installed version differs,
// keep this handler body and adjust the wrapper to match your version's docs.
export const ServerRoute = createServerFileRoute().methods({
  POST: async ({ request }) => {
    try {
      const body = (await request.json().catch(() => ({}))) as { agentId?: string }
      const signedUrl = await getSignedUrl(body.agentId)
      return json({ signedUrl })
    } catch (e) {
      return json({ error: String((e as Error).message || e) }, { status: 500 })
    }
  },
})
