import { useState, useEffect, useRef } from 'react'

const pool = [
  { name: 'Ana M.',    city: 'Madrid' },
  { name: 'Carlos R.', city: 'Barcelona' },
  { name: 'Laura G.',  city: 'Valencia' },
  { name: 'Diego F.',  city: 'Sevilla' },
  { name: 'Marta P.',  city: 'Bilbao' },
  { name: 'Sergio T.', city: 'Zaragoza' },
  { name: 'Lucía V.',  city: 'Málaga' },
  { name: 'Pablo S.',  city: 'Murcia' },
  { name: 'Elena C.',  city: 'Palma' },
  { name: 'Andrés L.', city: 'Granada' },
  { name: 'Nora B.',   city: 'Alicante' },
  { name: 'Rubén C.',  city: 'Coruña' },
]

function randBetween(min, max) { return Math.random() * (max - min) + min }

export default function Toast() {
  const [visible, setVisible] = useState(false)
  const [idx, setIdx]         = useState(0)
  const timerRef              = useRef(null)
  const poolRef               = useRef([...pool].sort(() => Math.random() - .5))

  useEffect(() => {
    // First toast after ~6s
    timerRef.current = setTimeout(show, 6000)
    return () => clearTimeout(timerRef.current)
  }, [])

  function show() {
    setIdx(prev => (prev + 1) % poolRef.current.length)
    setVisible(true)

    // Hide after 4s
    timerRef.current = setTimeout(() => {
      setVisible(false)
      // Next toast in 9–17s
      timerRef.current = setTimeout(show, randBetween(9000, 17000))
    }, 4000)
  }

  const notif = poolRef.current[idx]

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`fixed bottom-[84px] left-4 z-[180] transition-all duration-500
                  ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'}`}
    >
      <div className="bg-hero-deep/96 backdrop-blur-[16px] border border-sage/22
                      rounded-2xl px-4 py-3 flex items-center gap-3
                      shadow-[0_8px_32px_rgba(26,40,24,.38)] max-w-[260px]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-sage/20 border border-sage/25
                        flex items-center justify-center
                        font-body font-semibold text-xs text-cream flex-shrink-0">
          {notif.name[0]}
        </div>
        <div>
          <p className="font-h2 font-semibold text-cream text-[.78rem] leading-tight">
            {notif.name} <span className="font-body font-light text-cream/50">de {notif.city}</span>
          </p>
          <p className="text-cream/45 text-[.65rem] font-body font-light mt-0.5 flex items-center gap-1">
            <span className="text-sage text-[.7rem]">✓</span>
            acaba de reservar su plaza
          </p>
        </div>
      </div>
    </div>
  )
}
