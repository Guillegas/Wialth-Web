import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter.js'

const stats = [
  { badge: true,  label: 'Plazas limitadas.\nBadge exclusivo y beneficios incluidos.', duration: 0 },
  { value: 2,    suffix: ' min', label: 'Para tu primer análisis financiero completo con IA.', duration: 800 },
  { value: 0,    suffix: '€',    label: 'Durante todo el acceso anticipado.\nGratis de verdad.', duration: 400 },
]

/* ── EA featured card ── */
function EaCard({ stat, delay }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      role="listitem"
      className={`reveal ${delay} ${visible ? 'active' : ''}
                  relative rounded-[24px] px-7 py-9 overflow-hidden flex flex-col justify-between
                  shadow-[0_8px_40px_rgba(26,40,24,.22)]
                  transition-all duration-300 group`}
      style={{ background: 'linear-gradient(145deg, #4a6244 0%, #3d5239 50%, #2e3f2b 100%)' }}
    >
      {/* Top shine */}
      <span aria-hidden="true"
            className="absolute top-0 left-[10%] right-[10%] h-[1px]
                       bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      {/* Shimmer on hover */}
      <span aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,.04) 50%, transparent 65%)' }} />

      {/* Dot grid texture */}
      <div aria-hidden="true"
           className="absolute inset-0 opacity-[.06] pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(233,228,212,1) 1px, transparent 1px)',
             backgroundSize: '28px 28px',
           }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Star */}
        <div className="mb-4">
          <span className="text-salmon text-[1.4rem] leading-none"
                style={{ textShadow: '0 0 14px rgba(225,165,148,.7)' }}
                aria-hidden="true">★</span>
        </div>

        {/* Title */}
        <div className="font-h1 font-bold text-cream leading-[1.0] mb-4"
             style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}>
          Early<br />Adopters
        </div>

        {/* Label */}
        <p className="font-body font-light text-[.92rem] text-cream/60 leading-[1.6] whitespace-pre-line">
          {stat.label}
        </p>
      </div>

      {/* Bottom badge pill */}
      <div className="relative z-10 mt-8 inline-flex items-center gap-2 self-start
                      bg-cream/10 border border-cream/18 rounded-full px-3.5 py-1.5
                      backdrop-blur-sm">
        <span className="w-[6px] h-[6px] rounded-full bg-salmon animate-dot flex-shrink-0" aria-hidden="true" />
        <span className="font-body font-light text-[.7rem] tracking-[.06em] text-cream/80">
          Acceso prioritario
        </span>
      </div>
    </div>
  )
}

/* ── Regular stat card ── */
function StatCard({ stat, delay, accent }) {
  const [ref, visible] = useScrollReveal()
  const count = useAnimatedCounter(stat.value ?? 0, stat.duration ?? 0, visible)

  const accentColor = accent === 'sage'
    ? { bar: 'from-sage to-sage-dk', num: 'text-hero-deep', suffix: 'text-sage-dk' }
    : { bar: 'from-salmon to-salmon-dk', num: 'text-hero-deep', suffix: 'text-salmon' }

  return (
    <div
      ref={ref}
      role="listitem"
      className={`reveal ${delay} ${visible ? 'active' : ''}
                  bg-white/85 border border-sage/18
                  rounded-[20px] px-6 py-7 relative overflow-hidden flex-1
                  shadow-[0_1px_3px_rgba(145,160,141,.12),0_8px_28px_rgba(26,40,24,.07)]
                  transition-all duration-300 group card-3d
                  hover:shadow-[0_2px_6px_rgba(145,160,141,.18),0_20px_48px_rgba(26,40,24,.12)]`}
    >
      {/* Top accent bar */}
      <div aria-hidden="true"
           className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accentColor.bar}
                       opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className={`font-h1 font-bold text-[clamp(2.4rem,2rem+1.5vw,3.2rem)]
                       tracking-[-0.03em] ${accentColor.num} leading-none mb-2 tabular-nums`}>
        {count}
        <span className={accentColor.suffix}>{stat.suffix}</span>
      </div>
      <p className="font-body font-light text-[.88rem] text-hero-deep/54 leading-[1.6] whitespace-pre-line">
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const [hRef, hVisible] = useScrollReveal()
  const [lRef, lVisible] = useScrollReveal()

  return (
    <section className="bg-sand px-5 sm:px-8 py-12 sm:py-24" id="stats" aria-label="Estadísticas">
      <div className="max-w-[900px] mx-auto">
        <p ref={hRef}
           className={`reveal ${hVisible ? 'active' : ''} sec-label-line font-body font-light text-[.7rem] uppercase tracking-[.18em] text-muted mb-4`}>
          Por qué Wialth
        </p>
        <h2 ref={lRef}
            className={`reveal ${lVisible ? 'active' : ''} font-h2 font-semibold text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] text-hero-deep leading-[1.2] mb-10`}>
          Diseñado para las personas,<br />no para los bancos
        </h2>

        {/* Mobile: stack vertical | Desktop: EA grande izq + 2 stats apiladas dcha */}
        <div role="list" className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-4 items-stretch">

          <EaCard stat={stats[0]} delay="d1" />

          <div className="flex flex-col gap-4">
            <StatCard stat={stats[1]} delay="d2" accent="sage" />
            <StatCard stat={stats[2]} delay="d3" accent="salmon" />
          </div>

        </div>
      </div>
    </section>
  )
}
