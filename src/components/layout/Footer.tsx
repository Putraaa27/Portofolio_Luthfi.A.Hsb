import type { Profile } from '../../types/portfolio'

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/10 section-padding pb-10 pt-16">
      <div className="container-wide flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            {profile.displayName}
          </p>
          <p className="mt-1 text-sm text-white/45">AI Engineer · Machine Learning · Data Science</p>
        </div>
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} {profile.fullName}. Crafted with precision.
        </p>
      </div>
    </footer>
  )
}
