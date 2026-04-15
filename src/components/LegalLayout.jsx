import { Link } from 'react-router-dom'

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-[#F2F1ED]">

      {/* Header */}
      <header className="bg-hero-deep px-5 sm:px-10 py-5 flex items-center justify-between">
        <Link to="/" aria-label="Volver al inicio" className="flex items-center gap-3 no-underline">
          <img src="/logo-crema.png" alt="Wialth" className="h-8 w-auto opacity-90" />
          <span className="font-h1 font-bold text-[1.1rem] tracking-[-0.02em] text-cream">Wialth AI</span>
        </Link>
        <Link
          to="/"
          className="font-body font-light text-[.78rem] text-cream/70 hover:text-cream
                     transition-colors duration-200 no-underline flex items-center gap-1.5"
        >
          ← Volver al inicio
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-5 sm:px-8 py-14 sm:py-20">

        {/* Title block */}
        <div className="mb-12">
          <h1 className="font-h1 font-bold text-[clamp(1.9rem,5vw,2.8rem)] tracking-[-0.03em]
                         text-hero-deep leading-[1.1] mb-3">
            {title}
          </h1>
          <p className="font-body font-light text-[.82rem] text-hero-deep/45 tracking-[.02em]">
            Última actualización: {lastUpdated}
          </p>
          <div className="mt-5 h-[2px] w-16 bg-hero-deep/20 rounded-full" />
        </div>

        {/* Legal prose */}
        <div className="legal-prose">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-hero-deep px-5 py-8 text-center">
        <p className="font-body font-light text-[.75rem] text-cream/50 leading-[1.9]">
          © 2026 Wialth · Todos los derechos reservados.
          <br />
          <Link to="/privacidad" className="text-cream/60 hover:text-cream/90 no-underline transition-colors duration-200 mx-2">
            Política de Privacidad
          </Link>
          ·
          <Link to="/aviso-legal" className="text-cream/60 hover:text-cream/90 no-underline transition-colors duration-200 mx-2">
            Aviso Legal
          </Link>
          ·
          <Link to="/cookies" className="text-cream/60 hover:text-cream/90 no-underline transition-colors duration-200 mx-2">
            Cookies
          </Link>
        </p>
      </footer>
    </div>
  )
}
