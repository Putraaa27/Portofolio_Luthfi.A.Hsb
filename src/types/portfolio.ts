export interface PortfolioFile {
  name: string
  type: 'pdf' | 'notebook' | 'image' | 'readme' | 'link' | 'other'
  url: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  category: string
  theme?: string
  techStack: string[]
  thumbnail?: string
  heroImage?: string
  gallery: string[]
  previewPdf?: string
  readme?: string
  folderPath: string
  files: PortfolioFile[]
  highlights: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Certificate {
  id: string
  title: string
  url: string
  category?: string
}

export interface ExperienceItem {
  role: string
  org: string
  period: string
  description: string
}

export interface SkillCategory {
  id: string
  label: string
  icon: string
  skills: string[]
}

export interface Profile {
  displayName: string
  fullName: string
  roles: string[]
  headline: string
  tagline: string
  bio: string
  email: string
  whatsapp: string
  location: string
  photoUrl: string
  cvUrl: string
  focusAreas: string[]
}

export interface PortfolioData {
  profile: Profile
  skillCategories: SkillCategory[]
  experience: ExperienceItem[]
  projects: PortfolioProject[]
  certificates: Certificate[]
  scannedAt: string
}
