import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PremiumButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  external?: boolean
  icon?: ReactNode
}

export function PremiumButton({
  href,
  children,
  variant = 'primary',
  external,
  icon,
}: PremiumButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300'
  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03]',
    ghost: 'glass text-white hover:bg-white/10',
    outline: 'border border-white/20 text-white hover:border-violet-400/50 hover:bg-violet-500/10',
  }

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]}`}
    >
      {children}
      {icon}
    </motion.a>
  )
}
