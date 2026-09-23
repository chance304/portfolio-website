import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { JsonLd } from '@/components/JsonLd'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { siteConfig } from '@/lib/seo/site-config'
import { graph, personSchema, profilePageSchema, websiteSchema } from '@/lib/seo/schema'

export const metadata = generatePageMetadata({
  description: siteConfig.description,
  path: '/',
  type: 'profile',
})

export default function HomePage() {
  return (
    <main>
      <JsonLd data={graph(personSchema(), websiteSchema(), profilePageSchema())} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
