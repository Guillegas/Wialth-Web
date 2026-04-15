import { useScrollReveal } from '../hooks/useScrollReveal.js'

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    tag: 'CORE',
    title: 'Control de gastos automático',
    desc: 'Conecta tu cuenta bancaria y Wialth categoriza tus gastos en tiempo real. Sin hojas de cálculo ni esfuerzo manual.',
    stat: '0 min',
    statLabel: 'de configuración',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    tag: 'IA',
    title: 'Consejos con IA personalizada',
    desc: 'Tu asistente financiero analiza tus patrones de gasto y te da recomendaciones concretas y accionables, adaptadas a ti.',
    stat: '2 min',
    statLabel: 'primer análisis',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
      </svg>
    ),
    tag: 'METAS',
    title: 'Metas de ahorro visuales',
    desc: 'Define tus objetivos de ahorro, ya sea un viaje, un fondo de emergencia o una inversión, y Wialth te guía con un plan realista adaptado a tus ingresos.',
    stat: '3×',
    statLabel: 'más ahorro medio',
  },
]

function BenefitCard({ benefit, delay }) {
  const [ref, visible] = useScrollReveal()

  return (
    <article
      ref={ref}
      role="listitem"
      className={`reveal ${delay} ${visible ? 'active' : ''}
                  flex flex-col sm:flex-row gap-5 items-start
                  p-6 sm:p-7 rounded-2xl
                  bg-white/60 border border-sage/[.15]
                  shadow-[0_1px_3px_rgba(145,160,141,.10),0_6px_24px_rgba(26,40,24,.06)]
                  transition-all duration-300 group card-3d
                  hover:shadow-[0_2px_6px_rgba(145,160,141,.18),0_16px_40px_rgba(26,40,24,.10)]`}
    >
      {/* Icon */}
      <div className="w-[54px] h-[54px] flex-shrink-0
                      bg-gradient-to-br from-sage/12 to-sage/5
                      border border-sage/20 rounded-[14px]
                      flex items-center justify-center text-sage-dk
                      transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-[-2deg]
                      group-hover:bg-gradient-to-br group-hover:from-sage/22 group-hover:to-sage/10">
        {benefit.icon}
      </div>

      {/* Body */}
      <div className="flex-1">
        <div className="flex items-center gap-2.5 flex-wrap mb-2">
          <span className="font-h2 font-semibold text-[1.05rem] text-hero-deep">
            {benefit.title}
          </span>
          <span className="font-body font-light text-[.58rem] uppercase tracking-[.12em]
                           text-sage-dk border border-sage/32 px-[9px] py-[2px] rounded-full
                           bg-sage/7">
            {benefit.tag}
          </span>
        </div>
        <p className="font-body font-light text-[.95rem] text-hero-deep/58 leading-[1.7] mb-4">
          {benefit.desc}
        </p>
        {/* Mini stat */}
        <div className="inline-flex items-baseline gap-1.5 bg-sand/70 border border-sage/20 rounded-[10px] px-3 py-1.5">
          <span className="font-h1 font-bold text-[1.1rem] text-hero-deep tracking-tight">{benefit.stat}</span>
          <span className="font-body font-light text-[.72rem] text-hero-deep/50">{benefit.statLabel}</span>
        </div>
      </div>
    </article>
  )
}

export default function Benefits() {
  const [hRef, hVisible] = useScrollReveal()
  const [lRef, lVisible] = useScrollReveal()

  return (
    <section className="bg-offwhite px-5 sm:px-8 py-12 sm:py-24" id="benefits" aria-label="Beneficios">
      <div className="max-w-[720px] mx-auto">
        <p ref={hRef}
           className={`reveal ${hVisible ? 'active' : ''} sec-label-line font-body font-light text-[.7rem] uppercase tracking-[.18em] text-muted mb-4`}>
          Para qué sirve
        </p>
        <h2 ref={lRef}
            className={`reveal ${lVisible ? 'active' : ''} font-h2 font-semibold text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] text-hero-deep leading-[1.2] mb-10`}>
          Todo lo que necesitas<br />para crecer
        </h2>

        <div role="list" className="flex flex-col gap-4">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} delay={`d${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
