import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import type { Profile } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { MagneticButton } from '../ui/MagneticButton'

export function Contact({ profile }: { profile: Profile }) {
  const emailHref = `mailto:${profile.email}?subject=Portfolio%20Inquiry%20-%20Luthfi.A.Hasibuan`
  const whatsappHref = `https://wa.me/${profile.whatsapp}?text=Hello%20Luthfi%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.`

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-50" aria-hidden />

      <div className="container-wide relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent"
          description="Open to collaborations, research opportunities, and impactful AI engineering projects."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-3xl glass-strong p-8 text-center md:p-12"
        >
          <p className="mb-2 text-sm text-white/45">{profile.location}</p>
          <p className="mb-8 text-white/60">{profile.email}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton href={emailHref} variant="primary">
              <Mail className="h-4 w-4" />
              Send Email
            </MagneticButton>
            <MagneticButton href={whatsappHref} variant="outline" external>
              <MessageCircle className="h-4 w-4" />
              Chat WhatsApp
            </MagneticButton>
          </div>

          <p className="mt-8 text-xs text-white/35">
            WhatsApp: 0882015572948 · Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  )
}
