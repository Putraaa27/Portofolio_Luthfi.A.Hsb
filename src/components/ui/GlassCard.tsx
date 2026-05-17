import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  glow?: string
}

export function GlassCard({ children, className = '', onClick, glow }: GlassCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl glass p-6 transition-shadow duration-500 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={
        glow
          ? ({ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px ${glow}` } as React.CSSProperties)
          : undefined
      }
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,255,0.08), transparent 40%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.article>
  )
}
