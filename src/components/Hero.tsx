'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import mePhoto from '@/assets/me.jpeg'

export function Hero() {
  return (
    <section id="home" className="container mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium text-muted-foreground">Hello, I'm</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
            Shobhit Tripathi
          </h1>
          <h2 className="mt-4 text-lg text-muted-foreground md:text-xl">
            Engineering leader who builds rigorous, AI-native platforms end to end
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            CTO / IT Director at NS Engineering, where I designed and run the company's entire
            technology stack as its sole engineer. Before that, 7+ years at Deloitte, where I
            earned Technology Guild Guru. I also build Quantum Foundry, an open-source
            semiconductor simulator.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Projects
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto aspect-square w-48 overflow-hidden rounded-2xl border border-border shadow-sm md:w-full"
        >
          <Image src={mePhoto} alt="Shobhit Tripathi" className="h-full w-full object-cover" priority />
        </motion.div>
      </div>
    </section>
  )
}
