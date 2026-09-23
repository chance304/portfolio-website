// Cloudflare Web Analytics (ADR-004, #7): cookieless, no consent banner.
// Rendered only when NEXT_PUBLIC_CF_BEACON_TOKEN is set at build time, so local
// builds, previews without the token and tests stay analytics-free.
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN
  if (!token) return null
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  )
}
