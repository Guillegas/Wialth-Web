import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const faqs = [
  {
    q: '¿Es gratis?',
    a: 'Sí. Durante todo el período de acceso anticipado, Wialth es completamente gratuito. Sin tarjeta, sin compromisos.',
  },
  {
    q: '¿Es seguro conectar mi banco?',
    a: 'Utilizamos tecnología open banking certificada con conexión cifrada de extremo a extremo. Wialth solo tiene acceso de lectura: nunca podremos mover dinero de tu cuenta. Todos tus datos están protegidos bajo la normativa RGPD.',
  },
  {
    q: '¿Cuándo sale la app?',
    a: 'El lanzamiento oficial está previsto para el 1 de octubre de 2026. Los primeros en apuntarse recibirán acceso prioritario antes que el resto.',
  },
  {
    q: '¿Con qué bancos funciona?',
    a: 'Wialth usa tecnología Open Banking, lo que nos da acceso a miles de bancos en toda Europa. BBVA, Santander, CaixaBank, Sabadell, ING, Bankinter y muchos más, todo desde un mismo lugar.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí. No hay ningún compromiso. Puedes darte de baja cuando quieras desde la app, sin formularios ni llamadas.',
  },
  {
    q: '¿Qué hace la IA exactamente?',
    a: 'Analiza tus patrones de gasto, detecta suscripciones olvidadas, proyecta tu ahorro mensual y te sugiere acciones concretas para mejorar tu salud financiera. Todo de forma automática y personalizada.',
  },
]

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal d${Math.min(index + 1, 5)} ${visible ? 'active' : ''}
                  border-b border-sage/15 last:border-0`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left py-5 gap-4 group"
      >
        <span className="font-h2 font-semibold text-[1rem] text-hero-deep leading-snug group-hover:text-sage-dk transition-colors duration-200">
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-[28px] h-[28px] rounded-full
                      border border-sage/25 bg-sage/[.06]
                      flex items-center justify-center
                      text-sage-dk transition-all duration-300
                      ${open ? 'rotate-45 bg-sage/15' : ''}`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11"/>
            <line x1="1" y1="6" x2="11" y2="6"/>
          </svg>
        </span>
      </button>

      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p className="font-body font-light text-[.95rem] text-hero-deep/62 leading-[1.74] pb-5 pr-10">
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [hRef, hVisible] = useScrollReveal()
  const [lRef, lVisible] = useScrollReveal()

  return (
    <section className="relative px-5 sm:px-8 pt-12 pb-12 sm:pt-24 sm:pb-20" aria-label="Preguntas frecuentes">
      <div className="max-w-[680px] mx-auto">
        <p ref={hRef}
           className={`reveal ${hVisible ? 'active' : ''} sec-label-line font-body font-light text-[.7rem] uppercase tracking-[.18em] text-muted mb-4`}>
          Preguntas frecuentes
        </p>
        <h2 ref={lRef}
            className={`reveal ${lVisible ? 'active' : ''} font-h2 font-semibold text-[clamp(1.6rem,1.2rem+2vw,2.4rem)] text-hero-deep leading-[1.2] mb-10`}>
          Todo lo que quieres<br />saber antes de apuntarte
        </h2>

        <div className="bg-white/70 border border-sage/15 rounded-[20px] px-5 sm:px-7
                        shadow-[0_1px_3px_rgba(145,160,141,.10),0_6px_24px_rgba(26,40,24,.06)]">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
