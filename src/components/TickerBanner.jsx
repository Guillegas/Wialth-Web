const items = [
  { icon: '🔒', text: 'Datos cifrados' },
  { icon: '✓',  text: 'Sin spam' },
  { icon: '🇪🇸', text: 'Hecho en España' },
  { icon: '🏦', text: 'Open Banking' },
  { icon: '⭐', text: '5 estrellas' },
  { icon: '🎯', text: 'Sin tarjeta' },
  { icon: '✓',  text: 'RGPD compliant' },
  { icon: '🔓', text: 'Cancela cuando quieras' },
  { icon: '🤖', text: 'IA personalizada' },
  { icon: '⚡', text: 'Análisis en 2 min' },
]

export default function TickerBanner() {
  const doubled = [...items, ...items]

  return (
    <div
      className="bg-hero-deep/95 border-y border-sage/20 overflow-hidden py-3"
      aria-hidden="true"
    >
      <div className="ticker-track animate-ticker flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-cream/55 font-body font-light text-[.74rem] tracking-[.04em]">
            <span className="text-sm">{item.icon}</span>
            {item.text}
            <span className="text-cream/20 ml-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
