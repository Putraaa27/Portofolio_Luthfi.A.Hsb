import { motion } from 'framer-motion'
import type { Profile } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProfilePortrait } from '../profile/ProfilePortrait'

interface AboutProps {
  profile: Profile
}

export function About({ profile }: AboutProps) {
  const paragraphs = profile.bio.split('\n\n')

  return (
    <section id="about" className="section-padding relative">
      <div className="container-wide">
        <SectionHeading
          eyebrow="About"
          title="Engineering intelligence with purpose"
          description="Research-driven AI development meets refined digital craftsmanship."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden justify-center lg:flex"
          >
            <ProfilePortrait src={profile.photoUrl} alt={profile.fullName} className="max-w-[280px]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl space-y-6"
          >
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="text-base leading-[1.85] text-white/62 md:text-[1.05rem]"
              >
                {para}
              </motion.p>
            ))}

            <div className="flex flex-wrap gap-2 pt-4">
              {profile.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/55"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
