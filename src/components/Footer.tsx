const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

// TODO(chance): replace with real profile URLs
const SOCIAL_LINKS = [
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'GitHub' },
  { href: '#', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <h3 className="font-semibold">Shobhit Tripathi</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Builder & Founder — Enterprise Systems, Infrastructure & AI
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-medium">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Connect</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Shobhit Tripathi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
