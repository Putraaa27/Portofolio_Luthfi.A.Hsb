import { motion } from 'framer-motion'
import { Brain, Layout, Server, BarChart3, Wrench } from 'lucide-react'
import type { SkillCategory } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

const ICONS: Record<string, typeof Brain> = {
  brain: Brain,
  layout: Layout,
  server: Server,
  chart: BarChart3,
  wrench: Wrench,
}

export function Skills({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="section-padding relative border-y border-white/[0.04]">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Expertise"
          title="Technical Expertise"
          description="A multidisciplinary stack spanning AI research, production engineering, and premium interactive experiences."
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat, ci) => {
            const Icon = ICONS[cat.icon] ?? Brain
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: ci * 0.06, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-shadow duration-500 hover:border-violet-400/25 hover:shadow-[0_20px_60px_-24px_rgba(124,92,255,0.35)]"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-violet-300 transition group-hover:from-violet-500/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {cat.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.04 + si * 0.02 }}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/60 transition-colors group-hover:border-white/15 group-hover:text-white/75"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
