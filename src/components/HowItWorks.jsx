import { useScrollReveal } from '../hooks/useScrollReveal.js'

const steps = [
  {
    n: '1',
    title: 'Reserva tu plaza hoy',
    desc: 'Regístrate con tu email en segundos. Sin tarjeta de crédito, sin compromisos. Tu acceso anticipado queda guardado desde este momento.',
    tag: 'Ahora',
    tagColor: 'text-salmon',
  },
  {
    n: '2',
    title: 'Conecta tu banco de forma segura',
    desc: 'Dale voz a tus cuentas bancarias para que trabajen contigo hacia tus objetivos. Tecnología open banking cifrada de extremo a extremo, solo lectura y protegida bajo RGPD.',
    tag: 'Al lanzar',
    tagColor: 'text-sage',
  },
  {
    n: '3',
    title: 'Tu IA trabaja para ti',
    desc: 'Recibe tu primer análisis financiero completo en menos de 2 minutos. Wialth entiende tus finanzas mejor que tú mismo.',
    tag: 'En 2 min',
    tagColor: 'text-sage-dk',
  },
]

export default function HowItWorks() {
  const [hRef, hVisible] = useScrollReveal()
  const [lRef, lVisible] = useScrollReveal()

  return (
    <section className="bg-offwhite px-5 sm:px-8 py-12 sm:py-24" id="how" aria-label="Cómo funciona">
      <div className="max-w-[680px] mx-auto">
        <p ref={hRef}
           className={`reveal ${hVisible ? 'active' : ''} sec-label-line font-body font-light text-[.7rem] uppercase tracking-[.18em] text-muted mb-4`}>
          Cómo funciona
        </p>
        <h2 ref={lRef}
            className={`reveal ${lVisible ? 'active' : ''} font-h2 font-semibold text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] text-hero-deep leading-[1.2] mb-12`}>
          En 3 pasos,<br />empieza a controlar
        </h2>

        <div role="list" className="relative flex flex-col pl-2">
          {/* Connecting line */}
          <div aria-hidden="true"
               className="absolute left-[33px] top-[54px] bottom-[54px] w-[1px]
                          bg-gradient-to-b from-sage/30 to-sage/03 pointer-events-none z-0" />

          {steps.map((s, i) => (
            <StepItem key={s.n} step={s} delay={`d${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepItem({ step, delay }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      role="listitem"
      className={`reveal ${delay} ${visible ? 'active' : ''}
                  flex gap-5 items-start py-7 relative z-[1] group`}
    >
      {/* Step number */}
      <div className="w-[46px] h-[46px] rounded-full flex-shrink-0
                      bg-gradient-to-br from-sage to-sage-dk
                      flex items-center justify-center
                      font-h1 font-bold text-[.95rem] text-cream
                      z-[1] transition-transform duration-300
                      shadow-[0_0_0_5px_#F2F1ED,0_4px_14px_rgba(107,128,100,.35)]
                      group-hover:scale-110">
        {step.n}
      </div>

      {/* Content */}
      <div className="pt-2.5 flex-1">
        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
          <span className="font-h2 font-semibold text-[1.05rem] text-hero-deep">{step.title}</span>
          <span className={`font-body font-light text-[.58rem] uppercase tracking-[.12em] ${step.tagColor}
                           border border-current/30 px-[9px] py-[2px] rounded-full opacity-75`}>
            {step.tag}
          </span>
        </div>
        <p className="font-body font-light text-[.95rem] text-hero-deep/58 leading-[1.7]">
          {step.desc}
        </p>
      </div>
    </div>
  )
}
