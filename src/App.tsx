import { useCallback, useEffect, useState } from 'react'
import AOS from 'aos'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolioData from './data/portfolio.generated.json'
import type { PortfolioData } from './types/portfolio'
import { useLenis } from './hooks/useLenis'
import { useMouseGlow } from './hooks/useMouseGlow'
import { useCustomCursor } from './hooks/useCustomCursor'
import { IntroLoader } from './components/effects/IntroLoader'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { AllProjects } from './components/sections/Projects'
import { Certificates } from './components/sections/Certificates'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'

gsap.registerPlugin(ScrollTrigger)

const data = portfolioData as unknown as PortfolioData

function App() {
  const [introDone, setIntroDone] = useState(false)

  useLenis()
  useMouseGlow()
  useCustomCursor()

  const onIntroComplete = useCallback(() => setIntroDone(true), [])

  useEffect(() => {
    if (!introDone) return
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 50 })
    AOS.refresh()
  }, [introDone])

  useEffect(() => {
    if (!introDone) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        })
      })
    })
    return () => ctx.revert()
  }, [introDone])

  return (
    <>
      {!introDone && (
        <IntroLoader fullName={data.profile.fullName} onComplete={onIntroComplete} />
      )}

      <div
        className={`min-h-screen transition-opacity duration-1000 ease-out ${
          introDone ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,255,0.07), transparent 55%)',
          }}
        />

        <Navbar displayName={data.profile.displayName} />
        <main className="relative z-10">
          <Hero profile={data.profile} />
          <About profile={data.profile} />
          <Skills categories={data.skillCategories} />
          <AllProjects projects={data.projects} />
          <Certificates certificates={data.certificates} />
          <Experience items={data.experience} />
          <Contact profile={data.profile} />
        </main>
        <Footer profile={data.profile} />
      </div>
    </>
  )
}

export default App
