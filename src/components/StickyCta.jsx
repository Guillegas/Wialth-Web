import { useState, useEffect } from 'react'

export default function StickyCta({ heroRef }) {
  const [visible, setVisible]   = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hh        = heroRef?.current?.offsetHeight ?? 600
      const scrolled  = window.scrollY
      const fromBottom = document.documentElement.scrollHeight - scrolled - window.innerHeight

      setVisible(scrolled > hh * 0.60)
      setAtBottom(fromBottom < 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [heroRef])

  function scrollToCta() {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  const show = visible && !atBottom

  return (
    <div
      role="complementary"
      aria-label="Reservar plaza"
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-[150]
                  bg-hero-deep/97 backdrop-blur-[20px] border-t border-sage/18
                  px-5 pt-3.5 sticky-cta flex items-center gap-3
                  transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)]
                  ${show ? 'translate-y-0' : 'translate-y-[105%]'}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-[6px] h-[6px] rounded-full bg-salmon animate-dot flex-shrink-0" aria-hidden="true" />
          <span className="font-h2 font-semibold text-[.88rem] text-sage leading-tight truncate">
            Consigue tu badge de Early Adopter
          </span>
        </div>
        <span className="font-body font-light text-[.7rem] text-sage-dk/80">
          Acceso prioritario · Badge exclusivo en la app
        </span>
      </div>

      <button
        onClick={scrollToCta}
        aria-label="Ir al formulario de Early Adopter"
        className="flex-shrink-0 h-11 px-5 bg-salmon text-white border-none rounded-[10px]
                   font-body font-normal text-[.88rem] cursor-pointer whitespace-nowrap
                   shadow-[0_4px_16px_rgba(225,165,148,.38)]
                   hover:bg-salmon-dk active:scale-[.96]
                   transition-all duration-200"
        style={{ WebkitAppearance: 'none' }}
      >
        Unirme →
      </button>
    </div>
  )
}
