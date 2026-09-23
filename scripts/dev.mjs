// `npm run dev`: starts the contact mock and `next dev` together, so the whole
// site, including the contact form, works locally with no cloud credentials.
import { spawn } from 'node:child_process'

const procs = [
  spawn(process.execPath, ['scripts/contact-mock.mjs'], { stdio: 'inherit' }),
  spawn('npx', ['next', 'dev', ...process.argv.slice(2)], { stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } }),
]
const stop = (code = 0) => {
  for (const p of procs) if (!p.killed) p.kill('SIGTERM')
  process.exit(code)
}
process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
for (const p of procs) p.on('exit', (code) => stop(code ?? 0))
