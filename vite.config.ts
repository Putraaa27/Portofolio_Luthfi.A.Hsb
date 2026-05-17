import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function portfolioScannerPlugin() {
  const runScan = async () => {
    const { default: scanPortfolio } = await import('./scripts/scanPortfolio.ts')
    scanPortfolio()
  }

  return {
    name: 'portfolio-scanner',
    buildStart() {
      return runScan()
    },
    configureServer() {
      return runScan()
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioScannerPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
