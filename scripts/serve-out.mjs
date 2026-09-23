// Minimal static server for the built site (out/), with static-host semantics:
// /path/ → /path/index.html, unknown paths → 404.html with status 404.
// Used by the Playwright suite and Lighthouse so tests hit exactly what ships.
import { createServer } from 'node:http'
import { gzipSync } from 'node:zlib'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'out')
const port = Number(process.env.PORT ?? 4173)
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' }

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const candidates = clean.endsWith('/') ? [join(root, clean, 'index.html')] : [join(root, clean), join(root, clean, 'index.html')]
  for (const c of candidates) {
    try {
      if ((await stat(c)).isFile()) return c
    } catch { /* try next */ }
  }
  return null
}

createServer(async (req, res) => {
  const file = await resolve(req.url ?? '/')
  if (!file) {
    res.writeHead(404, { 'content-type': TYPES['.html'] }).end(await readFile(join(root, '404.html')))
    return
  }
  // Mirror what production static hosts do: compress text and cache hashed
  // build assets forever, so Lighthouse measures what visitors actually get.
  const type = TYPES[extname(file)] ?? 'application/octet-stream'
  const headers = { 'content-type': type, 'cache-control': file.includes('/_next/static/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' }
  let body = await readFile(file)
  if (/text|javascript|json|xml|svg|manifest/.test(type) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
    body = gzipSync(body)
    headers['content-encoding'] = 'gzip'
  }
  res.writeHead(200, headers).end(body)
}).listen(port, '127.0.0.1', () => console.log(`serving out/ on http://127.0.0.1:${port}`))
