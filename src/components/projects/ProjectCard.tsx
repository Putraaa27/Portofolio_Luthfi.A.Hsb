import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { PortfolioProject } from '../../types/portfolio'
import { GlassCard } from '../ui/GlassCard'
import { PdfThumbnail } from './PdfThumbnail'

interface ProjectCardProps {
  project: PortfolioProject
  onOpen: (project: PortfolioProject) => void
}

const CATEGORY_GLOW: Record<string, string> = {
  'Deep Learning': 'rgba(124, 92, 255, 0.35)',
  'Machine Learning & Healthcare AI': 'rgba(45, 212, 191, 0.3)',
  'Data Analytics & Visualization': 'rgba(96, 165, 250, 0.3)',
  'AI Web Application': 'rgba(167, 139, 250, 0.35)',
  'AI Environmental System': 'rgba(52, 211, 153, 0.3)',
  'Web Development Platform': 'rgba(129, 140, 248, 0.3)',
  'Educational Platform': 'rgba(251, 191, 36, 0.25)',
  'AI Engineering': 'rgba(124, 92, 255, 0.25)',
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const glow = CATEGORY_GLOW[project.category] ?? 'rgba(124, 92, 255, 0.25)'
  const cover = project.heroImage ?? project.thumbnail

  return (
    <div data-aos="fade-up" className="h-full">
      <GlassCard onClick={() => onOpen(project)} glow={glow} className="h-full overflow-hidden p-0">
        <div className="flex h-full flex-col">
          <motion.div className="group/preview relative aspect-[16/10] overflow-hidden bg-[#0a0c14]">
            {cover ? (
              <motion.img
                src={cover}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/preview:scale-[1.06]"
              />
            ) : project.previewPdf ? (
              <PdfThumbnail pdfUrl={project.previewPdf} alt={project.title} />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500/15 to-cyan-400/10" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#030408]/95 via-[#030408]/25 to-transparent opacity-90 transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-100/90 backdrop-blur-md">
                {project.category}
              </span>
              <motion.span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md"
                whileHover={{ rotate: 45, scale: 1.08 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </div>
          </motion.div>

          <div className="flex flex-1 flex-col p-6">
            <h3
              className="font-display text-lg font-semibold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>
            {project.theme && (
              <p className="mt-1 text-xs font-medium text-cyan-300/65">{project.theme}</p>
            )}
            <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-white/50">
              {project.description}
            </p>
            <motion.div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/55"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02 }}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
