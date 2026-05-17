import { motion } from 'framer-motion'
import type { ExperienceItem } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'

export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Experience"
          title="Professional journey"
          description="Building intelligent systems across healthcare, environment, education, and fullstack platforms."
        />

        <motion.div className="space-y-5">
          {items.map((item, i) => (
            <motion.div
              key={item.role + item.org}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="!p-6 md:!p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-violet-300/80">{item.org}</p>
                  </div>
                  <span className="shrink-0 text-sm text-white/40">{item.period}</span>
                </div>
                <p className="mt-4 leading-relaxed text-white/55">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
