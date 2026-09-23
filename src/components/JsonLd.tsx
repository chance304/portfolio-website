/** Renders a JSON-LD document into static HTML (no client JavaScript). */
export function JsonLd({ data }: { data: unknown }) {
  // "<" is escaped so content can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
