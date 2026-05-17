import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ProfilePortraitProps {
  src: string
  alt: string
  className?: string
}

export function ProfilePortrait({ src, alt, className = '' }: ProfilePortraitProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 22 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative mx-auto w-full max-w-[320px] ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
    >
      {/* Animated gradient ring */}
      <motion.div
        className="absolute -inset-3 rounded-full opacity-80"
        style={{
          background: 'conic-gradient(from 0deg, #7c5cff, #2dd4bf, #7c5cff)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glow layers */}
      <div className="absolute -inset-6 rounded-full bg-violet-500/20 blur-3xl" />
      <motion.div
        className="absolute -inset-4 rounded-full bg-cyan-400/10 blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glass frame */}
      <motion.div
        className="relative aspect-square overflow-hidden rounded-full border border-white/20 bg-white/5 p-1.5 shadow-2xl shadow-violet-900/40 backdrop-blur-xl"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top scale-105"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060a]/50 via-transparent to-white/10"
            initial={false}
          />
        </div>
      </motion.div>

      {/* Identity badge */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass-strong px-4 py-1.5 text-xs font-medium text-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        AI Engineer
      </motion.div>
    </motion.div>
  )
}
