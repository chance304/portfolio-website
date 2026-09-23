import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Page not found · Shobhit Tripathi', robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-32">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-muted-foreground">
        It may have moved. Try the <a className="underline underline-offset-4" href="/">homepage</a> or the{' '}
        <a className="underline underline-offset-4" href="/quantum-foundry/">Quantum Foundry write-up</a>.
      </p>
    </main>
  )
}
