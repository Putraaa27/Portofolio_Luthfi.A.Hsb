import { useState } from 'react'
import type { PortfolioProject } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectModal } from '../projects/ProjectModal'

export function AllProjects({ projects }: { projects: PortfolioProject[] }) {
  const [selected, setSelected] = useState<PortfolioProject | null>(null)

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.06),transparent_65%)]" />
      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Work"
          title="All Projects"
          description="A curated collection of AI systems, machine learning research, and production web platforms—automatically organized from real project assets."
        />

        {projects.length === 0 ? (
          <p className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-6 py-8 text-center text-sm text-amber-200/80">
            Data proyek belum ada di deploy. Jalankan <code className="text-amber-100">npm run scan</code> di lokal,
            lalu commit <code className="text-amber-100">public/assets</code> dan{' '}
            <code className="text-amber-100">src/data/portfolio.generated.json</code>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
