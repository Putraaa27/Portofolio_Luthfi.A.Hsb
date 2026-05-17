import { useState } from 'react'
import type { PortfolioProject } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectModal } from '../projects/ProjectModal'

export function AllProjects({ projects }: { projects: PortfolioProject[] }) {
  const [selected, setSelected] = useState<PortfolioProject | null>(null)

  if (!projects.length) return null

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.06),transparent_65%)]" />
      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Work"
          title="All Projects"
          description="A curated collection of AI systems, machine learning research, and production web platforms—automatically organized from real project assets."
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
