import { readFileSync } from 'node:fs'
import path from 'node:path'
import './qf.css'
import { JsonLd } from '@/components/JsonLd'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { articleSchema, breadcrumbSchema, graph, softwareSourceCodeSchema } from '@/lib/seo/schema'
import { absoluteUrl } from '@/lib/seo/site-config'

const PATH = '/quantum-foundry/'
const DESCRIPTION =
  "Quantum Foundry is an open-source multi-physics simulator for post-silicon and 3D-stacked transistors. It ranks 2D materials and stacking choices on performance, heat and manufacturability together, and never reports a number a solver didn't produce."

export const metadata = generatePageMetadata({
  title: 'Quantum Foundry',
  description: DESCRIPTION,
  path: PATH,
  image: '/og/quantum-foundry.png',
  type: 'article',
  keywords: ['semiconductor device simulation', '2D materials', 'CFET', '3D integration', 'NEGF', 'open source'],
})

// The write-up is hand-authored static HTML (src/content/quantum-foundry.html),
// read at build time and emitted as part of the prerendered page. No client JS.
const content = readFileSync(path.join(process.cwd(), 'src/content/quantum-foundry.html'), 'utf8')

export default function QuantumFoundryPage() {
  const software = softwareSourceCodeSchema({
    name: 'Quantum Foundry',
    description: DESCRIPTION,
    path: PATH,
    codeRepository: 'https://github.com/chance304/quantum-foundry',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    programmingLanguage: 'Python',
    keywords: ['semiconductor', 'device simulation', '2D materials', 'CFET', 'GAA', 'thermal', 'yield'],
  })
  return (
    <>
      <JsonLd
        data={graph(
          software,
          articleSchema({
            headline: 'Quantum Foundry: an honest simulator for post-silicon devices',
            description: DESCRIPTION,
            path: PATH,
            image: '/og/quantum-foundry.png',
            datePublished: '2026-09-23',
            about: absoluteUrl(`${PATH}#software`),
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Quantum Foundry', path: PATH },
          ]),
        )}
      />
      <div className="qf" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
