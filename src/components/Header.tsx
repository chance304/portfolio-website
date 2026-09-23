'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from '@/lib/theme'

// '#…' = homepage sections; '/…' = pages.
const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '/work/', label: 'Work' },
  { href: '/research/', label: 'Research' },
  { href: '/resume/', label: 'Résumé' },
  { href: '#contact', label: 'Contact' },
]

function scrollToSection(id: string) {
  const target = document.querySelector(id)
  if (!target) return
  const headerOffset = 64
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top, behavior: 'smooth' })
}

export function Header() {
  const { toggleTheme } = useTheme()
  const pathname = usePathname()
  const onHome = pathname === '/'
  // Section links scroll in place on the homepage and navigate to it elsewhere.
  const linkHref = (href: string) => (href.startsWith('/') || onHome ? href : `/${href}`)
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    setSheetOpen(false)
    if (!onHome || !href.startsWith('#')) return
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? 'bg-background/90 backdrop-blur border-border' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href={linkHref('#home')}
          onClick={handleNavClick('#home')}
          className="font-semibold tracking-tight"
        >
          Shobhit Tripathi
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={linkHref(link.href)}
                onClick={handleNavClick(link.href)}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark/light theme"
            onClick={toggleTheme}
          >
            <Sun className="hidden size-4 dark:block" aria-hidden="true" />
            <Moon className="size-4 dark:hidden" aria-hidden="true" />
          </Button>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <ul className="mt-10 flex flex-col gap-6 px-6 text-lg">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={linkHref(link.href)} onClick={handleNavClick(link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
