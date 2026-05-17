import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  variant?: 'primary' | 'ghost' | 'outline'
}

export function MagneticButton({
  href,
  children,
  className = '',
  external,
  variant = 'primary',
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 22 })
  const sy = useSpring(y, { stiffness: 280, damping: 22 })

  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600/90 to-cyan-500/90 text-white shadow-lg shadow-violet-500/20 hover:shadow-cyan-500/25',
    ghost: 'glass text-white hover:bg-white/10',
    outline: 'border border-white/15 text-white hover:border-cyan-400/40 hover:bg-cyan-500/5',
  }

  return (
    <motion.a
      href={href}
      data-magnetic
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.2)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.2)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-shadow duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
