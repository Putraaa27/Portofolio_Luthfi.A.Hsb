/// <reference types="vite/client" />

declare module 'aos' {
  interface AosOptions {
    duration?: number
    once?: boolean
    easing?: string
    offset?: number
  }
  const AOS: {
    init(options?: AosOptions): void
    refresh(): void
  }
  export default AOS
}
