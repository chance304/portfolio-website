import { notFound } from 'next/navigation'
import { CaseStudyPage } from '@/components/CaseStudyPage'
import { caseStudies } from '@/content/profile'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) return {}
  return generatePageMetadata({ title: study.title, description: study.summary, path: `/work/${slug}/`, image: `/og/${slug}.png`, type: 'article' })
}

export default async function CaseStudyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) notFound()
  return <CaseStudyPage study={study} path={`/work/${slug}/`} />
}
