import * as pdfjs from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

const cache = new Map<string, string>()

export async function renderPdfPreview(url: string, scale = 1.2): Promise<string | null> {
  if (cache.has(url)) return cache.get(url) ?? null

  try {
    const doc = await pdfjs.getDocument(url).promise
    const page = await doc.getPage(1)
    const viewport = page.getViewport({ scale })
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvas, canvasContext: ctx, viewport }).promise
    const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
    cache.set(url, dataUrl)
    return dataUrl
  } catch {
    return null
  }
}
