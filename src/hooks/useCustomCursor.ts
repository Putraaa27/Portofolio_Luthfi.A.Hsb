import { useEffect } from 'react'

export function useCustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = document.createElement('div')
    dot.className = 'cursor-dot pointer-events-none fixed z-[300] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 mix-blend-screen transition-transform duration-150'
    const ring = document.createElement('div')
    ring.className =
      'cursor-ring pointer-events-none fixed z-[299] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 transition-all duration-300 ease-out'

    document.body.appendChild(ring)
    document.body.appendChild(dot)
    document.body.classList.add('custom-cursor')

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
    }

    const tick = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      requestAnimationFrame(tick)
    }
    const frame = requestAnimationFrame(tick)

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-magnetic]')) {
        ring.style.width = '56px'
        ring.style.height = '56px'
        ring.style.borderColor = 'rgba(45,212,191,0.5)'
        dot.style.transform = 'translate(-50%, -50%) scale(1.8)'
      }
    }
    const onOut = () => {
      ring.style.width = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(255,255,255,0.2)'
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      dot.remove()
      ring.remove()
      document.body.classList.remove('custom-cursor')
    }
  }, [])
}
