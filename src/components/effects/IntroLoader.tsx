import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Particles } from './Particles'

interface IntroLoaderProps {
  fullName: string
  onComplete: () => void
}

export function IntroLoader({ fullName, onComplete }: IntroLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        gsap.to(root, {
          opacity: 0,
          filter: 'blur(24px)',
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    gsap.set(root, { opacity: 1 })
    gsap.set([eyebrowRef.current, titleRef.current, subRef.current, lineRef.current, barRef.current], {
      opacity: 0,
      y: 28,
      filter: 'blur(12px)',
    })

    if (auroraRef.current) {
      gsap.fromTo(
        auroraRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
      )
      gsap.to(auroraRef.current, {
        rotate: 8,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    tl.to(root, { duration: 0.01 })
      .to(lineRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 0.15)
      .to(eyebrowRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 }, 0.25)
      .to(titleRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' }, 0.4)
      .to(subRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 0.65)
      .to(barRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, 0.75)
      .fromTo(
        barFillRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.6, ease: 'power2.inOut' },
        0.85,
      )
      .to({}, { duration: 0.45 })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#030408]"
      aria-hidden
    >
      <div
        ref={auroraRef}
        className="pointer-events-none absolute inset-[-20%] opacity-60"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(124,92,255,0.15), rgba(45,212,191,0.08), rgba(30,27,75,0.2), rgba(124,92,255,0.12))',
          filter: 'blur(80px)',
        }}
      />
      <div className="aurora-bg absolute inset-0" />
      <Particles count={24} />

      <div className="relative z-10 px-6 text-center">
        <div
          ref={lineRef}
          className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        />
        <p
          ref={eyebrowRef}
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-white/35"
        >
          Portfolio Experience
        </p>
        <h1
          ref={titleRef}
          className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-gradient">{fullName}</span>
        </h1>
        <p ref={subRef} className="mt-5 text-sm text-white/40 md:text-base">
          Data Scientist · Machine Learning · Fullstack
        </p>
        <div ref={barRef} className="mx-auto mt-12 h-[2px] w-56 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            ref={barFillRef}
            className="h-full w-full origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500"
          />
        </div>
      </div>
    </div>
  )
}
