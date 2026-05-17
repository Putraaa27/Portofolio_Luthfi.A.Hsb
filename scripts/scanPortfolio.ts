import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type {
  Certificate,
  PortfolioData,
  PortfolioFile,
  PortfolioProject,
  SkillCategory,
} from '../src/types/portfolio'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = path.resolve(__dirname, '..')
const PUBLIC_ASSETS = path.join(WEB_ROOT, 'public', 'assets')
const OUTPUT_JSON = path.join(WEB_ROOT, 'src', 'data', 'portfolio.generated.json')

/** Set during scan — parent folder containing my_Projeckt + Sertifikat */
let PORTFOLIO_ROOT = path.resolve(WEB_ROOT, '..')
let PROJECTS_DIR = path.join(PORTFOLIO_ROOT, 'my_Projeckt')
let CERTS_DIR = path.join(PORTFOLIO_ROOT, 'Sertifikat')

function resolveDataRoots(): { portfolioRoot: string; projectsDir: string; certsDir: string } | null {
  const candidates = [
    process.env.PORTFOLIO_DATA_ROOT?.trim(),
    path.join(WEB_ROOT, 'portfolio-data'),
    path.resolve(WEB_ROOT, '..'),
  ].filter((p): p is string => Boolean(p))

  for (const root of candidates) {
    const projectsDir = path.join(root, 'my_Projeckt')
    const certsDir = path.join(root, 'Sertifikat')
    if (fs.existsSync(projectsDir) || fs.existsSync(certsDir)) {
      return { portfolioRoot: root, projectsDir, certsDir }
    }
  }
  return null
}

function loadExistingData(): PortfolioData | null {
  if (!fs.existsSync(OUTPUT_JSON)) return null
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf-8')) as PortfolioData
  } catch {
    return null
  }
}

/** Safe path segments for Vercel/static hosting (no spaces in URLs) */
function sanitizePathSegment(segment: string) {
  return segment.replace(/\s+/g, '-')
}

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.vite', '__pycache__', 'src'])
const PREVIEW_PATTERN = /tampilan\s*depan|preview|thumbnail|cover|hero|mockup/i
const PREVIEW_FOLDER_PATTERN = /tampilan\s*depan|^preview$|^thumbnail$/i

const BIO = `I am an AI Engineer, Machine Learning Engineer, and Data Scientist focused on building intelligent systems that combine research-driven development with modern software engineering. My work spans healthcare AI, deep learning, environmental intelligence, and interactive web technologies—transforming complex data into impactful and user-centered digital solutions.

I specialize in developing end-to-end machine learning pipelines, AI-powered applications, and modern frontend experiences using Python, TensorFlow, React, and TypeScript. With a strong analytical mindset and passion for innovation, I aim to create technology that is not only technically robust, but also visually refined, intuitive, and meaningful for real-world use.`

type Meta = Partial<PortfolioProject> & { match: string | RegExp }

const PROJECT_META: Meta[] = [
  {
    match: 'Data_analys',
    title: 'Data Analytics Portfolio',
    category: 'Data Analytics & Visualization',
    theme: 'R & Statistical Visualization',
    description:
      'Comprehensive data analytics profile featuring exploratory analysis, visualization, and published R Markdown insights on RPubs.',
    techStack: ['R', 'R Markdown', 'ggplot2', 'RPubs', 'Statistics'],
    highlights: ['Published analytics profile', 'Data storytelling', 'RPubs integration'],
  },
  {
    match: 'Projek_cocoa',
    title: 'Cocoa Leaf Disease Detection',
    category: 'Deep Learning',
    theme: 'Agricultural Computer Vision',
    description:
      'Deep learning system for classifying cocoa leaf diseases using convolutional neural networks and computer vision pipelines.',
    techStack: ['Python', 'TensorFlow', 'CNN', 'Computer Vision', 'Jupyter'],
    highlights: ['Image classification', 'Agricultural AI', 'CNN architecture'],
  },
  {
    match: 'NewKanker',
    title: 'Cancer Detection ML',
    category: 'Machine Learning & Healthcare AI',
    theme: 'Clinical Diagnostics',
    description:
      'Machine learning models for cancer detection and clinical risk analysis using structured healthcare datasets.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Healthcare ML'],
    highlights: ['Medical data modeling', 'Predictive diagnostics', 'Healthcare AI'],
  },
  {
    match: 'Obesitas',
    title: 'Obesity Prediction Platform',
    category: 'Machine Learning & Healthcare AI',
    theme: 'Lifestyle Risk Analytics',
    description:
      'Predictive modeling and web presentation for obesity risk assessment using lifestyle and biometric features.',
    techStack: ['Python', 'Scikit-learn', 'React', 'Healthcare ML'],
    highlights: ['Risk prediction', 'Interactive presentation', 'Clinical insights'],
  },
  {
    match: 'cancer-detection-web',
    title: 'Cancer Detection Web App',
    category: 'AI Web Application',
    theme: 'Healthcare AI Interface',
    description:
      'Fullstack AI web application delivering cancer detection capabilities through an intuitive, production-oriented interface.',
    techStack: ['React', 'TypeScript', 'Machine Learning API', 'TailwindCSS'],
    highlights: ['AI-powered UI', 'Healthcare application', 'Fullstack delivery'],
  },
  {
    match: 'scan-sampah-main',
    title: 'EcoShort AI',
    category: 'AI Environmental System',
    theme: 'Waste Detection & Smart Recycling',
    description:
      'Environmental intelligence platform for AI-powered waste detection, classification, and smart recycling guidance.',
    techStack: ['React', 'AI Vision', 'Vercel', 'TypeScript'],
    highlights: ['Waste classification', 'Smart recycling', 'Live deployment'],
    liveUrl: 'https://ecoshort-ai.vercel.app/',
  },
  {
    match: 'itsb-nexus-main',
    title: 'ITSB Nexus',
    category: 'Web Development Platform',
    theme: 'Institutional Digital Platform',
    description:
      'Modern web platform engineered for institutional workflows, content management, and scalable frontend architecture.',
    techStack: ['React', 'TypeScript', 'REST API', 'TailwindCSS'],
    highlights: ['Platform architecture', 'Scalable UI', 'Institutional systems'],
  },
  {
    match: 'smart-school-dist',
    title: 'Smart School',
    category: 'Educational Platform',
    theme: 'School Management System',
    description:
      'Educational management platform connecting students, academics, and administration through a refined digital experience.',
    techStack: ['React', 'TypeScript', 'Vercel'],
    highlights: ['School management', 'Modern UX', 'Live deployment'],
    liveUrl: 'https://smart-school-060851.vercel.app/',
  },
  {
    match: 'smart-school-hub-main',
    title: 'Smart School Hub',
    category: 'Educational Platform',
    theme: 'Integrated School Hub',
    description:
      'Centralized educational hub platform designed for streamlined academic operations and modern school administration.',
    techStack: ['React', 'TypeScript', 'Fullstack'],
    highlights: ['Hub architecture', 'Academic workflows', 'Premium interface'],
  },
]

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    label: 'AI / Machine Learning',
    icon: 'brain',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'OpenCV',
      'CNN',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'Prompt Engineering',
      'Pandas',
      'NumPy',
      'Keras',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'layout',
    skills: [
      'React',
      'Next.js',
      'Vite',
      'TailwindCSS',
      'GSAP',
      'Framer Motion',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'server',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Supabase', 'REST API'],
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    icon: 'chart',
    skills: [
      'Power BI',
      'Looker Studio',
      'SQL',
      'R',
      'RPubs',
      'Excel',
      'Statistics',
      'Data Visualization',
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: 'wrench',
    skills: ['Git', 'GitHub', 'Vercel', 'Figma', 'VS Code', 'Kaggle', 'Linux', 'Postman'],
  },
]

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function copyFile(src: string, dest: string) {
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
}

function assetUrl(relative: string) {
  return `/assets/${relative.replace(/\\/g, '/')}`
}

function findMeta(folderPath: string, fileName?: string): Meta | undefined {
  const haystack = `${folderPath}\\${fileName ?? ''}`
  return PROJECT_META.find((meta) => {
    const m = meta.match
    return typeof m === 'string' ? haystack.includes(m) : m.test(haystack)
  })
}

function titleFromName(name: string) {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isPreviewName(name: string) {
  return PREVIEW_PATTERN.test(name) || PREVIEW_FOLDER_PATTERN.test(name)
}

function certCategory(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('elevai') || t.includes('microsoft')) return 'Microsoft ElevAIte AI'
  if (t.includes('kaggle')) return 'Kaggle'
  if (t.includes('webinar')) return 'Webinar'
  return 'Data Science'
}

interface CollectedAsset {
  files: PortfolioFile[]
  images: { url: string; name: string; isPreview: boolean }[]
  readmes: { name: string; content: string }[]
}

function collectAssets(dir: string, projectSlug: string, base = dir): CollectedAsset {
  const result: CollectedAsset = { files: [], images: [], readmes: [] }
  if (!fs.existsSync(dir)) return result

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      const inPreviewFolder = PREVIEW_FOLDER_PATTERN.test(entry.name)
      const nested = collectAssets(full, projectSlug, base)
      result.files.push(...nested.files)
      result.readmes.push(...nested.readmes)
      for (const img of nested.images) {
        result.images.push({ ...img, isPreview: img.isPreview || inPreviewFolder })
      }
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()
    const rel = path.relative(base, full)
    const safeRel = rel.split(path.sep).map(sanitizePathSegment).join(path.sep)
    const dest = path.join(PUBLIC_ASSETS, 'projects', projectSlug, safeRel)
    copyFile(full, dest)
    const url = assetUrl(path.relative(PUBLIC_ASSETS, dest))

    if (ext === '.pdf') result.files.push({ name: entry.name, type: 'pdf', url })
    else if (ext === '.ipynb') result.files.push({ name: entry.name, type: 'notebook', url })
    else if (IMAGE_EXT.has(ext)) {
      result.files.push({ name: entry.name, type: 'image', url })
      result.images.push({ url, name: entry.name, isPreview: isPreviewName(entry.name) })
    } else if (ext === '.md') {
      result.files.push({ name: entry.name, type: 'readme', url })
      try {
        const content = fs.readFileSync(full, 'utf-8').slice(0, 12000)
        result.readmes.push({ name: entry.name, content })
      } catch {
        /* ignore */
      }
    } else if (ext === '.txt') {
      result.files.push({ name: entry.name, type: 'readme', url })
    } else {
      result.files.push({ name: entry.name, type: 'other', url })
    }
  }

  return result
}

function pickHeroAndGallery(images: { url: string; name: string; isPreview: boolean }[]) {
  const preview = images.find((i) => i.isPreview)
  const hero = preview?.url ?? images[0]?.url
  const gallery = images
    .map((i) => i.url)
    .filter((url, idx, arr) => arr.indexOf(url) === idx)
    .filter((url) => url !== hero)
  return { hero, gallery: hero ? [hero, ...gallery] : gallery }
}

function buildProject(folderPath: string, primaryFile?: string): PortfolioProject | null {
  const relFolder = path.relative(PROJECTS_DIR, folderPath)
  const projectSlug = slugify(primaryFile ? `${relFolder}-${primaryFile}` : relFolder)
  const collected = collectAssets(folderPath, projectSlug)
  if (!collected.files.length) return null

  const meta = findMeta(folderPath, primaryFile)
  const pdf = collected.files.find((f) => f.type === 'pdf')
  const { hero, gallery } = pickHeroAndGallery(collected.images)
  const folderName = primaryFile ? path.parse(primaryFile).name : path.basename(folderPath)
  const readme = collected.readmes[0]

  return {
    id: projectSlug,
    title: meta?.title ?? titleFromName(folderName),
    description: meta?.description ?? `Project workspace for ${titleFromName(folderName)}.`,
    category: meta?.category ?? 'AI Engineering',
    theme: meta?.theme,
    techStack: meta?.techStack ?? ['Python', 'AI', 'Data Science'],
    thumbnail: hero,
    heroImage: hero,
    gallery,
    previewPdf: pdf?.url,
    readme: readme?.content,
    folderPath: relFolder,
    files: collected.files,
    highlights: meta?.highlights ?? ['Research-driven development', 'Production-oriented delivery'],
    liveUrl: meta?.liveUrl,
    githubUrl: meta?.githubUrl,
  }
}

function discoverProjects(): PortfolioProject[] {
  const projects: PortfolioProject[] = []
  const seen = new Set<string>()

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    const notebooks = entries.filter((e) => e.isFile() && e.name.endsWith('.ipynb'))
    const hasProjectFiles = entries.some(
      (e) =>
        e.isFile() &&
        (e.name.endsWith('.pdf') ||
          e.name.endsWith('.ipynb') ||
          IMAGE_EXT.has(path.extname(e.name).toLowerCase())),
    )

    if (notebooks.length > 1) {
      for (const nb of notebooks) {
        const p = buildProject(dir, nb.name)
        if (p && !seen.has(p.id)) {
          seen.add(p.id)
          projects.push(p)
        }
      }
      return
    }

    if (hasProjectFiles) {
      const p = buildProject(dir)
      if (p && !seen.has(p.id)) {
        seen.add(p.id)
        projects.push(p)
        return
      }
    }

    for (const entry of entries) {
      if (entry.isDirectory() && !SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name))
    }
  }

  walk(PROJECTS_DIR)
  return projects.sort((a, b) => a.title.localeCompare(b.title))
}

function scanCertificates(): Certificate[] {
  if (!fs.existsSync(CERTS_DIR)) return []
  return fs
    .readdirSync(CERTS_DIR)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .map((file) => {
      const src = path.join(CERTS_DIR, file)
      const id = slugify(file)
      const dest = path.join(PUBLIC_ASSETS, 'certificates', `${id}.pdf`)
      copyFile(src, dest)
      const title = titleFromName(file)
      return {
        id,
        title,
        url: assetUrl(path.relative(PUBLIC_ASSETS, dest)),
        category: certCategory(title),
      }
    })
}

function copyProfileAssets() {
  const profileDir = path.join(PUBLIC_ASSETS, 'profile')
  fs.mkdirSync(profileDir, { recursive: true })

  for (const name of ['Pas foto.jpeg', 'pas_foto.png', 'Pas foto.png']) {
    const src = path.join(PORTFOLIO_ROOT, name)
    if (fs.existsSync(src)) {
      copyFile(src, path.join(profileDir, `photo${path.extname(name)}`))
      break
    }
  }

  for (const name of ['CV Luthfi.A.Hasibuan.pdf']) {
    const src = path.join(PORTFOLIO_ROOT, name)
    if (fs.existsSync(src)) {
      copyFile(src, path.join(profileDir, 'cv.pdf'))
      break
    }
  }
}

export default function scanPortfolio() {
  fs.mkdirSync(PUBLIC_ASSETS, { recursive: true })
  const existing = loadExistingData()
  const roots = resolveDataRoots()

  if (!roots) {
    console.warn(
      '⚠ Folder my_Projeckt / Sertifikat tidak ditemukan (normal di Vercel jika hanya repo portfolio-web).',
    )
    console.warn('  → Memakai data portfolio yang sudah di-commit (portfolio.generated.json + public/assets).')
    if (existing?.projects?.length) {
      console.log(
        `✓ Deploy-safe: ${existing.projects.length} projects, ${existing.certificates?.length ?? 0} certificates`,
      )
      return
    }
    console.error(
      '✗ Tidak ada data portfolio. Jalankan "npm run scan" di lokal, lalu commit public/assets dan portfolio.generated.json',
    )
    process.exitCode = 1
    return
  }

  PORTFOLIO_ROOT = roots.portfolioRoot
  PROJECTS_DIR = roots.projectsDir
  CERTS_DIR = roots.certsDir
  console.log(`→ Scanning portfolio data from: ${PORTFOLIO_ROOT}`)

  copyProfileAssets()

  let projects = discoverProjects()
  let certificates = scanCertificates()

  if (projects.length === 0 && existing?.projects?.length) {
    console.warn('⚠ Scan projects kosong — mempertahankan projects dari file yang ada.')
    projects = existing.projects
  }
  if (certificates.length === 0 && existing?.certificates?.length) {
    console.warn('⚠ Scan certificates kosong — mempertahankan certificates dari file yang ada.')
    certificates = existing.certificates
  }

  const profileDir = path.join(PUBLIC_ASSETS, 'profile')
  const photoFile = fs.existsSync(profileDir)
    ? fs.readdirSync(profileDir).find((f) => f.startsWith('photo'))
    : undefined

  const data: PortfolioData = {
    profile: {
      displayName: 'Luthfi.A.Hasibuan',
      fullName: 'Luthfi Akhyar Hasibuan',
      roles: [
        'Data Scientist',
        'Machine Learning Engineer',
        'Prompt Engineer',
        'Fullstack Developer',
      ],
      headline: 'Luthfi Akhyar Hasibuan',
      tagline:
        'Building intelligent AI systems, machine learning solutions, and modern interactive web experiences.',
      bio: BIO,
      email: 'luthfiakhyarhsb27@gmail.com',
      whatsapp: '62882015572948',
      location: 'Indonesia',
      photoUrl: photoFile ? assetUrl(`profile/${photoFile}`) : '/assets/profile/photo.jpeg',
      cvUrl: '/assets/profile/cv.pdf',
      focusAreas: [
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
        'Data Analytics',
        'Fullstack Web Development',
        'Interactive Systems',
      ],
    },
    skillCategories: SKILL_CATEGORIES,
    experience: [
      {
        role: 'AI Engineer & Data Scientist',
        org: 'Independent / Academic Projects',
        period: '2024 — Present',
        description:
          'Designing end-to-end ML pipelines, healthcare AI models, environmental intelligence systems, and premium fullstack interfaces.',
      },
      {
        role: 'Machine Learning Engineer',
        org: 'Healthcare & Agricultural AI',
        period: '2024 — Present',
        description:
          'Developing cancer detection, obesity prediction, and cocoa disease classification systems with rigorous evaluation workflows.',
      },
      {
        role: 'Fullstack Developer',
        org: 'Web Platforms & AI Applications',
        period: '2024 — Present',
        description:
          'Shipping production-ready platforms including EcoShort AI, Smart School, ITSB Nexus, and AI-powered web applications.',
      },
    ],
    projects,
    certificates,
    scannedAt: new Date().toISOString(),
  }

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true })
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(data, null, 2))
  console.log(`✓ Portfolio scanned: ${projects.length} projects, ${certificates.length} certificates`)
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))

if (isMain) {
  scanPortfolio()
}
