import { useState, useEffect } from 'react'

/* Sections that have a DARK background (cream text needed) */
const DARK_IDS = ['hero', 'cta']

export default function Nav({ heroRef }) {
  const [ctaVisible, setCtaVisible] = useState(false)
  const [isDark, setIsDark]         = useState(true) // hero is dark → start with light text

  useEffect(() => {
    const NAV_H = 62

    function update() {
      const hh = heroRef?.current?.offsetHeight ?? 600
      setCtaVisible(window.scrollY > hh * 0.55)

      /* Check which section occupies the nav strip */
      let dark = false
      for (const id of DARK_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        // Section covers the nav if its top is above nav bottom and bottom is below nav top
        if (top < NAV_H && bottom > 0) { dark = true; break }
      }

      /* Footer has no id — treat everything after the last section as dark */
      const cta = document.getElementById('cta')
      if (cta && cta.getBoundingClientRect().bottom < 0) dark = true

      setIsDark(dark)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [heroRef])

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky top-0 z-[200] h-[62px] flex items-center justify-between px-5 bg-transparent border-b border-transparent"
    >
      {/* Logo */}
      <a href="#" aria-label="Wialth inicio" className="flex items-center">
        <img
          src={isDark ? '/logo-crema.png' : '/logo-verde.png'}
          alt="Wialth"
          className="h-[34px] w-auto transition-opacity duration-300"
          onError={e => { e.target.style.display = 'none' }}
        />
      </a>

      {/* Right side */}
      <div className="flex items-center gap-2.5">
        <span
          className={`font-body font-light text-[.7rem] tracking-[.04em] px-[13px] py-1 rounded-full border
                      transition-all duration-300
                      ${isDark
                        ? 'text-cream/90  bg-cream/[.12]    border-cream/[.22]'
                        : 'text-hero-deep bg-hero-deep/[.07] border-hero-deep/[.18]'
                      }`}
        >
          Próximamente
        </span>

        <a
          href="#cta"
          className={`h-9 px-[18px] bg-salmon text-white border-none rounded-[10px] font-body font-normal text-[.82rem]
            cursor-pointer no-underline inline-flex items-center justify-center
            hover:bg-salmon-dk active:scale-[.97] transition-all duration-200 whitespace-nowrap
            ${ctaVisible ? 'flex' : 'hidden'}`}
        >
          Unirme →
        </a>
      </div>
    </nav>
  )
}
