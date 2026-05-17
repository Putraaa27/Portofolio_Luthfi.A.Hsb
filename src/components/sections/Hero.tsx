import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import type { Profile } from '../../types/portfolio'
import { ProfilePortrait } from '../profile/ProfilePortrait'
import { MagneticButton } from '../ui/MagneticButton'
import { Particles } from '../effects/Particles'

export function Hero({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden pt-28">
      <div className="aurora-bg absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.12),transparent_50%)]" />
      <Particles />

      <motion.div style={{ y, opacity }} className="container-wide relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-14 px-5 pb-24 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/70"
          >
            {profile.roles.join(' · ')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl lg:text-[4.25rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-gradient">{profile.headline}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/55 md:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton href={profile.cvUrl} variant="outline" external>
              <Download className="h-4 w-4" />
              Download CV
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail className="h-4 w-4" />
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex items-center gap-2 text-xs text-white/35"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Scroll to explore
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <ProfilePortrait src={profile.photoUrl} alt={profile.fullName} />
        </motion.div>
      </motion.div>
    </section>
  )
}
