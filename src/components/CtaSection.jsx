import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function CtaSection({ subscribed, onSuccess }) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [cooldown, setCooldown] = useState(false)
  const [hRef, hVisible]      = useScrollReveal()

  async function handleSubmit(e) {
    e.preventDefault()
    if (cooldown) return
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError('Por favor, introduce un email válido.')
      return
    }
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, website: '' }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        onSuccess(); setEmail('')
        setCooldown(true)
        setTimeout(() => setCooldown(false), 60_000)
      } else if (res.status === 429) {
        setError('Demasiados intentos. Espera un momento.')
      } else {
        setError(data.message || 'Algo salió mal. Inténtalo de nuevo.')
      }
    } catch {
      setError('Error de conexión. Comprueba tu red.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="cta"
      aria-label="Únete a la lista de espera"
      className="relative cta-gradient px-5 sm:px-8 py-16 sm:py-36 overflow-hidden"
    >
      {/* Subtle radial highlights */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0"
           style={{
             background: `
               radial-gradient(ellipse 50% 40% at 80% 5%, rgba(233,228,212,.06) 0%, transparent 65%),
               radial-gradient(ellipse 40% 35% at 10% 90%, rgba(26,40,24,.12) 0%, transparent 65%)
             `
           }} />

      {/* Grain */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[.04] pointer-events-none z-0">
        <rect width="100%" height="100%" filter="url(#grain)" fill="white"/>
      </svg>

      <div ref={hRef} className="relative z-10 max-w-[520px] mx-auto text-center">
        {/* Logo */}
        <div className={`reveal d1 ${hVisible ? 'active' : ''} flex justify-center mb-7`}>
          <img src="/logo-crema.png" alt="Wialth" className="h-[38px] w-auto"
               onError={e => { e.target.style.display='none' }} />
        </div>

        {/* Badge */}
        <div className={`reveal d2 ${hVisible ? 'active' : ''} inline-flex items-center gap-2 font-body font-light text-[.76rem] tracking-[.06em]
                          text-cream/90 bg-[rgba(61,82,57,.35)] border border-cream/20
                          px-3.5 py-[6px] rounded-full mb-7 backdrop-blur-[8px]`}>
          <span className="w-[7px] h-[7px] rounded-full bg-salmon animate-dot flex-shrink-0" aria-hidden="true" />
          Early Adopter · Beneficios exclusivos
        </div>

        {/* Heading */}
        <h2 className={`reveal d3 ${hVisible ? 'active' : ''} font-h1 font-bold text-[clamp(2.4rem,1.6rem+4vw,4rem)]
                        tracking-[-0.03em] text-cream leading-[1.04] mb-4`}>
          Sé de los primeros.<br />Obtén tu badge.
        </h2>
        <p className={`reveal d3 ${hVisible ? 'active' : ''} font-body font-light text-[1rem] text-cream/60 mb-10 max-w-[36ch] mx-auto leading-[1.74]`}>
          Apúntate ahora y consigue acceso prioritario y un badge exclusivo de Early Adopter dentro de la app en el lanzamiento.
        </p>

        {/* Form */}
        {subscribed ? (
          <div className={`reveal ${hVisible ? 'active' : ''} flex flex-col items-center gap-4 py-4`}>
            <div className="w-16 h-16 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E9E4D4"
                   strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="font-h2 font-semibold text-cream text-[1.1rem]">¡Ya eres Early Adopter!</p>
            <p className="font-body font-light text-cream/65 text-sm leading-relaxed max-w-[30ch]">
              En menos de 1 minuto recibirás en tu correo la confirmación con tu badge exclusivo.
            </p>
          </div>
        ) : (
          <form
            id="cta-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario CTA"
            className={`reveal d4 ${hVisible ? 'active' : ''} flex flex-col sm:flex-row gap-2.5 max-w-[460px] mx-auto`}
          >
            {/* Honeypot — hidden from humans, bots fill it */}
            <input type="text" name="website" tabIndex="-1" autoComplete="off"
                   aria-hidden="true" style={{ display: 'none' }} />
            <div className="inp-wrap flex-1">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                inputMode="email"
                aria-label="Tu email"
                className="relative z-[1] block w-full h-[52px] bg-sand/88 border-[1.5px] border-cream/45
                           rounded-[12px] px-4 font-body font-light text-[16px] text-hero-deep
                           outline-none focus:border-transparent transition-colors duration-300
                           placeholder:text-hero-deep/38"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-[52px] px-6 bg-hero-deep text-cream border-none rounded-[12px]
                         font-body font-normal text-[16px] cursor-pointer whitespace-nowrap
                         shadow-[0_4px_20px_rgba(26,40,24,.38)]
                         hover:bg-[#2a3a27] active:scale-[.975]
                         disabled:opacity-65 disabled:pointer-events-none
                         transition-all duration-200 sm:w-auto w-full relative overflow-hidden"
              style={{ WebkitAppearance: 'none' }}
            >
              <span className="relative z-[1]">{loading ? 'Uniéndome…' : 'Unirme como Early Adopter →'}</span>
              <span aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-white/[.08] to-transparent pointer-events-none" />
            </button>
          </form>
        )}

        {error && (
          <p className="mt-3 font-body font-light text-[.84rem] text-cream/88
                        bg-salmon/12 border border-salmon/26 rounded-[10px] px-[15px] py-[9px]
                        max-w-[460px] mx-auto">
            {error}
          </p>
        )}

        {/* Trust line */}
        <div className={`reveal d5 ${hVisible ? 'active' : ''} mt-5 flex items-center justify-center gap-2
                         font-body font-light text-[.75rem] text-cream/65`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Sin spam · Sin tarjeta · Cancela cuando quieras
        </div>
      </div>
    </section>
  )
}
