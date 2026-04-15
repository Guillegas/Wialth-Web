import { useScrollReveal } from '../hooks/useScrollReveal.js'

const testimonials = [
  {
    quote: '"Por fin una app que no te da 40 gráficas que no entiendes. Solo lo que necesitas saber."',
    name: 'María R.',
    role: 'Diseñadora, Madrid',
    initials: 'MR',
    color: '#a8c4a2',
  },
  {
    quote: '"Me di cuenta de que gastaba 180€ al mes en suscripciones que ni usaba. Alucinante."',
    name: 'Álvaro L.',
    role: 'Ingeniero, Barcelona',
    initials: 'AL',
    color: '#c4a8a2',
  },
  {
    quote: '"Llevo 2 meses ahorrando el doble sin cambiar mis hábitos. Solo con las alertas de Wialth."',
    name: 'Sara G.',
    role: 'Enfermera, Sevilla',
    initials: 'SG',
    color: '#a2b5c4',
  },
  {
    quote: '"La IA me explicó por qué no llegaba a fin de mes mejor que yo mismo lo sabría explicar."',
    name: 'Javier M.',
    role: 'Freelance, Valencia',
    initials: 'JM',
    color: '#c4bca2',
  },
]

function Stars() {
  return (
    <div className="flex gap-[3px] mb-3" aria-label="5 estrellas">
      {Array(5).fill(null).map((_, i) => (
        <span key={i} className="text-salmon text-[.85rem]">★</span>
      ))}
    </div>
  )
}

function TestiCard({ t, delay }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${delay} ${visible ? 'active' : ''}
                  snap-start-item flex-shrink-0
                  w-[min(80vw,320px)] sm:w-auto
                  bg-white/62 border border-sage/18
                  rounded-[20px] px-5 py-5
                  shadow-[0_1px_3px_rgba(145,160,141,.14),0_8px_28px_rgba(26,40,24,.07)]
                  transition-all duration-300
                  hover:shadow-[0_2px_6px_rgba(145,160,141,.18),0_20px_48px_rgba(26,40,24,.12)]
                  hover:-translate-y-1`}
    >
      <Stars />
      <p className="font-body font-light italic text-[.92rem] text-hero-deep/70 leading-[1.72] mb-4">
        {t.quote}
      </p>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center
                        font-body font-normal text-[.74rem] text-hero-deep flex-shrink-0"
             style={{ background: `color-mix(in srgb, #F5EFE0 80%, ${t.color} 20%)` }}>
          {t.initials}
        </div>
        <div>
          <div className="font-h2 font-semibold text-[.85rem] text-hero-deep">{t.name}</div>
          <div className="font-body font-light text-[.74rem] text-hero-deep/44">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [hRef, hVisible] = useScrollReveal()
  const [lRef, lVisible] = useScrollReveal()

  return (
    <section className="bg-sand py-12 sm:py-24" aria-label="Primeras reacciones">
      <div className="max-w-[720px] mx-auto">
        <div className="px-5 sm:px-8">
          <p ref={hRef}
             className={`reveal ${hVisible ? 'active' : ''} sec-label-line font-body font-light text-[.7rem] uppercase tracking-[.18em] text-muted mb-4`}>
            Primeras reacciones
          </p>
          <h2 ref={lRef}
              className={`reveal ${lVisible ? 'active' : ''} font-h2 font-semibold text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] text-hero-deep leading-[1.2] mb-10`}>
            Lo que dicen<br />los primeros en apuntarse
          </h2>
        </div>

        {/* Mobile: horizontal scroll; Desktop: grid */}
        <div className="sm:hidden flex gap-3 overflow-x-auto snap-x-scroll px-5 pb-4 -mb-4
                        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <TestiCard key={t.name} t={t} delay={`d${i + 1}`} />
          ))}
        </div>

        <div className="hidden sm:grid grid-cols-2 gap-4 px-5 sm:px-8">
          {testimonials.map((t, i) => (
            <TestiCard key={t.name} t={t} delay={`d${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
