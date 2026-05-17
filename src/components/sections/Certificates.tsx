import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, X, ZoomIn } from 'lucide-react'
import type { Certificate } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { PdfThumbnail } from '../projects/PdfThumbnail'

const CATEGORY_COLORS: Record<string, string> = {
  'Microsoft ElevAIte AI': 'from-violet-500/20 to-indigo-500/10',
  Kaggle: 'from-cyan-500/20 to-blue-500/10',
  Webinar: 'from-amber-500/15 to-orange-500/10',
  'Data Science': 'from-emerald-500/15 to-teal-500/10',
}

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  const [active, setActive] = useState<Certificate | null>(null)

  return (
    <section id="certificates" className="section-padding border-t border-white/[0.04] bg-white/[0.01]">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Credentials"
          title="Certificates & Achievements"
          description="Professional certifications spanning Microsoft ElevAIte AI, Kaggle, webinars, and data science programs."
          align="center"
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              onClick={() => setActive(cert)}
              className={`group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${
                CATEGORY_COLORS[cert.category ?? 'Data Science'] ?? CATEGORY_COLORS['Data Science']
              } text-left backdrop-blur-xl transition duration-500 hover:border-violet-400/30 hover:shadow-[0_24px_60px_-28px_rgba(124,92,255,0.4)]`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <PdfThumbnail pdfUrl={cert.url} alt={cert.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030408]/80 to-transparent opacity-80" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
              <div className="p-4">
                {cert.category && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/70">
                    {cert.category}
                  </span>
                )}
                <p className="mt-2 flex items-start gap-2 text-sm font-medium leading-snug text-white/85">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  {cert.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#030408]/90 backdrop-blur-xl"
              onClick={() => setActive(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#080a12] shadow-2xl"
              initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.96, opacity: 0, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  {active.category && (
                    <p className="text-xs uppercase tracking-wider text-violet-300/70">{active.category}</p>
                  )}
                  <h3 className="mt-1 font-display text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-auto bg-[#0a0c14] p-2">
                <div className="aspect-[4/3] min-h-[280px] overflow-hidden rounded-2xl">
                  <PdfThumbnail pdfUrl={active.url} alt={active.title} />
                </div>
              </div>
              <div className="border-t border-white/10 p-4 text-center">
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-300 hover:underline"
                >
                  Open full certificate PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
