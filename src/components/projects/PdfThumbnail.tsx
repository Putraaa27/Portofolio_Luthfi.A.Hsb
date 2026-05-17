import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { renderPdfPreview } from '../../lib/pdfPreview'

interface PdfThumbnailProps {
  pdfUrl: string
  alt: string
  className?: string
}

export function PdfThumbnail({ pdfUrl, alt, className = '' }: PdfThumbnailProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    renderPdfPreview(pdfUrl).then((url) => {
      if (!active) return
      setSrc(url)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [pdfUrl])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-cyan-400/5">
          <motion.div
            className="h-8 w-8 rounded-full border-2 border-white/20 border-t-violet-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        !loading && (
          <motion.div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500/15 to-cyan-400/10">
            <FileText className="h-10 w-10 text-white/30" />
          </motion.div>
        )
      )}
    </div>
  )
}
