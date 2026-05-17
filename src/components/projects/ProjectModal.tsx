import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  FileText,
  BookOpen,
  Code2,
  Maximize2,
} from 'lucide-react'
import type { PortfolioProject } from '../../types/portfolio'
import { PdfThumbnail } from './PdfThumbnail'
import { MagneticButton } from '../ui/MagneticButton'

interface ProjectModalProps {
  project: PortfolioProject | null
  onClose: () => void
}

type Tab = 'overview' | 'gallery' | 'docs'

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [tab, setTab] = useState<Tab>('overview')
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!project) return
    setTab('overview')
    setSlide(0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const images =
    project?.gallery?.length
      ? project.gallery
      : project?.heroImage
        ? [project.heroImage]
        : []

  const pdfs = project?.files.filter((f) => f.type === 'pdf') ?? []

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-stretch justify-center p-0 md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          aria-label={project.title}
        >
          <motion.div
            className="absolute inset-0 bg-[#030408]/85 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            layout
            className="relative z-10 flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-none border border-white/10 bg-[#080a12]/95 shadow-2xl md:rounded-3xl md:max-h-[92vh]"
            initial={{ opacity: 0, y: 48, scale: 0.96, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 32, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
              <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                {(['overview', 'gallery', 'docs'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition ${
                      tab === t ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white/70'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {tab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2">
                  <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden bg-[#0c0e16] lg:aspect-auto lg:min-h-[320px]">
                    {images[slide] ? (
                      <img src={images[slide]} alt="" className="h-full w-full object-cover object-top" />
                    ) : project.previewPdf ? (
                      <PdfThumbnail pdfUrl={project.previewPdf} alt={project.title} />
                    ) : null}
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setSlide((s) => (s - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlide((s) => (s + 1) % images.length)}
                          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a12] via-transparent to-transparent" />
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">
                      {project.category}
                    </p>
                    <h2
                      className="mt-2 font-display text-2xl font-semibold md:text-3xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h2>
                    {project.theme && (
                      <p className="mt-2 text-sm text-cyan-300/75">{project.theme}</p>
                    )}
                    <p className="mt-4 leading-relaxed text-white/55">{project.description}</p>

                    <ul className="mt-6 space-y-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-white/50">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <span key={t} className="rounded-full glass px-3 py-1 text-xs text-white/65">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <MagneticButton href={project.liveUrl} variant="primary" external>
                          <ExternalLink className="h-4 w-4" />
                          Visit Website
                        </MagneticButton>
                      )}
                      {project.githubUrl && (
                        <MagneticButton href={project.githubUrl} variant="outline" external>
                          <Code2 className="h-4 w-4" />
                          GitHub
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === 'gallery' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-3 p-4 sm:grid-cols-2 md:p-6 lg:grid-cols-3"
                >
                  {images.length ? (
                    images.map((src, i) => (
                      <motion.button
                        key={src}
                        type="button"
                        onClick={() => {
                          setSlide(i)
                          setTab('overview')
                        }}
                        whileHover={{ scale: 1.02 }}
                        className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10"
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </motion.button>
                    ))
                  ) : (
                    <p className="col-span-full py-12 text-center text-white/40">No gallery images detected.</p>
                  )}
                </motion.div>
              )}

              {tab === 'docs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-6">
                  {project.readme && (
                    <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                        <BookOpen className="h-4 w-4 text-violet-400" />
                        Documentation
                      </div>
                      <pre className="max-h-64 overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/55">
                        {project.readme}
                      </pre>
                    </div>
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    {pdfs.map((pdf) => (
                      <div
                        key={pdf.url}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e16]"
                      >
                        <div className="aspect-[16/10]">
                          <PdfThumbnail pdfUrl={pdf.url} alt={pdf.name} />
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 p-4">
                          <span className="flex items-center gap-2 text-sm text-white/60">
                            <FileText className="h-4 w-4" />
                            {pdf.name}
                          </span>
                          <a
                            href={pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyan-300 hover:underline"
                          >
                            Open PDF
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!project.readme && !pdfs.length && (
                    <p className="py-12 text-center text-white/40">No documentation files found.</p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
