import { useState, useRef, useEffect } from 'react'
import PhoneMockup     from './PhoneMockup.jsx'
import PhoneMockupChat from './PhoneMockupChat.jsx'
import { useCountdown } from '../hooks/useCountdown.js'

function pad(n) { return String(n).padStart(2, '0') }

function CountdownUnit({ value, label, id, variant = 'cream' }) {
  const prevRef = useRef(null)
  const elRef   = useRef(null)

  useEffect(() => {
    const str = id === 'cd-d' ? String(value) : pad(value)
    if (prevRef.current !== null && prevRef.current !== str && elRef.current) {
      elRef.current.classList.remove('cd-flip')
      void elRef.current.offsetWidth
      elRef.current.classList.add('cd-flip')
    }
    prevRef.current = str
  }, [value, id])

  const str = id === 'cd-d' ? String(value) : pad(value)

  const isGreen = variant === 'green'

  return (
    <div className="flex flex-col items-center bg-cream/[.07] border border-cream/[.15] rounded-[10px]
                    py-[7px] px-[10px] min-w-[46px] backdrop-blur-sm">
      <span ref={elRef} id={id}
            className={`font-h1 font-bold text-[1rem] tracking-[-0.02em] leading-none tabular-nums
                        ${isGreen ? 'text-sage-dk' : 'text-cream'}`}>
        {str}
      </span>
      <span className={`font-body font-light text-[.52rem] tracking-[.1em] uppercase mt-[3px]
                        ${isGreen ? 'text-sage-dk/80' : 'text-cream/40'}`}>
        {label}
      </span>
    </div>
  )
}

export default function Hero({ heroRef }) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')
  const [ready, setReady]     = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const { days, hours, minutes, seconds } = useCountdown('2026-10-01T00:00:00')

  /* Trigger hero reveals immediately on mount */
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
  }, [])

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
        setSuccess(true); setEmail('')
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

  /* Helper: hero reveal class with active state */
  const r = (delay) => `reveal ${delay} ${ready ? 'active' : ''}`

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Sección principal"
      className="relative lg:min-h-[100dvh] hero-gradient flex flex-col -mt-[64px] overflow-x-hidden"
    >
      {/* ── Decorative layer — overflow-hidden solo aquí para contener blobs ── */}
      <div aria-hidden="true" className="hero-blobs absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute will-change-transform rounded-full
          w-[min(90vw,560px)] h-[min(90vw,560px)]
          bg-[radial-gradient(ellipse,rgba(145,160,141,.48)_0%,transparent_66%)]
          blur-[72px] top-[-22%] left-[-20%] animate-blob1" />
        <div className="absolute will-change-transform rounded-full
          w-[min(65vw,420px)] h-[min(65vw,420px)]
          bg-[radial-gradient(ellipse,rgba(225,165,148,.18)_0%,transparent_66%)]
          blur-[80px] bottom-[8%] right-[-14%] animate-blob2" />
        <div className="absolute will-change-transform rounded-full
          w-[min(50vw,310px)] h-[min(50vw,310px)]
          bg-[radial-gradient(ellipse,rgba(163,169,157,.26)_0%,transparent_66%)]
          blur-[64px] top-[36%] right-[18%] animate-blob3" />
        <div className="absolute will-change-transform rounded-full
          w-[min(60vw,380px)] h-[min(40vw,240px)]
          bg-[radial-gradient(ellipse,rgba(233,228,212,.07)_0%,transparent_70%)]
          blur-[50px] bottom-[12%] left-[10%] animate-blob4" />

        {/* Dot grid texture */}
        <div className="absolute inset-0 z-0 dot-grid" />
      </div>

      {/* ── Film grain ── */}
      <svg aria-hidden="true" className="grain-overlay absolute inset-0 w-full h-full opacity-[.04] pointer-events-none z-0">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="4" stitchTiles="stitch" result="n"/>
            <feColorMatrix type="saturate" values="0" in="n"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain)" fill="white"/>
      </svg>

      {/* ── Main layout ── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between
                      px-5 sm:px-8 lg:px-16 pt-[76px] pb-8 lg:pb-[130px] max-w-[1200px] mx-auto w-full gap-10 lg:gap-0">

        {/* ── Left column: headline + form ── */}
        <div className="flex flex-col max-w-[540px]">

          {/* Live badge */}
          <div className={`${r('d1')} inline-flex items-center gap-2 font-body font-light text-[.76rem]
                           tracking-[.06em] text-cream/90 bg-[rgba(61,82,57,.35)] border border-cream/20
                           px-3.5 py-[6px] rounded-full mb-8 w-fit backdrop-blur-[8px]`}>
            <span className="w-[7px] h-[7px] rounded-full bg-salmon animate-dot flex-shrink-0" aria-hidden="true" />
            Early Adopter &nbsp;·&nbsp; Beneficios exclusivos
          </div>

          {/* Headline */}
          <h1 aria-label="Tu asistente. Tu Plan. Tu Ritmo."
              className="font-h1 font-bold tracking-[-0.03em] leading-[1] mb-7">

            {/* Line 1 — pequeña, label tono */}
            <span className={`${r('d2')} block font-body font-light text-[clamp(.78rem,2vw,1rem)]
                               tracking-[.22em] uppercase text-cream/50 mb-3`}>
              finanzas con inteligencia
            </span>

            {/* Lines 2-4 — las tres frases, tamaño grande, cada una con su acento */}
            <span className={`${r('d3')} block text-[clamp(2.6rem,9.5vw,5.8rem)] text-cream leading-[.92]`}
                  style={{ textShadow: '0 0 80px rgba(145,160,141,.22)' }}>
              Tu asistente.
            </span>

            <span className={`${r('d4')} block text-[clamp(2.6rem,9.5vw,5.8rem)] leading-[.92]`}
                  style={{
                    WebkitTextStroke: '1.5px rgba(233,228,212,.55)',
                    color: 'transparent',
                    textShadow: 'none',
                  }}>
              Tu Plan.
            </span>

            <span className={`${r('d4')} block text-[clamp(2.6rem,9.5vw,5.8rem)] text-salmon leading-[.92]`}
                  style={{ textShadow: '0 0 56px rgba(225,165,148,.30)' }}>
              Tu Ritmo.
            </span>
          </h1>

          {/* Sub-copy */}
          <p className={`${r('d4')} font-body font-light text-[clamp(.92rem,2.6vw,1.06rem)]
                          text-cream max-w-[36ch] leading-[1.74] mb-8`}
             style={{ textShadow: '0 1px 4px rgba(61,82,57,.4)' }}>
            Ahorra más, gasta mejor y alcanza tus metas con IA que realmente entiende tu dinero.
          </p>

          {/* Glassmorphism form card */}
          <div className={`${r('d5')} bg-sage/[.09] backdrop-blur-[22px] border border-sage/20
                           rounded-[20px] p-4 max-w-[490px] mb-6`}>
            {success ? (
              <div className="flex flex-col items-center text-center py-4 gap-3">
                <div className="w-14 h-14 rounded-full bg-sage/20 border border-sage/30 flex items-center justify-center">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E9E4D4"
                       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-h2 font-semibold text-cream text-[1rem]">¡Ya eres Early Adopter!</p>
                <p className="font-body font-light text-cream/70 text-sm leading-relaxed">
                  Recibirás tu badge exclusivo cuando lancemos la app. Gracias por ser de los primeros.
                </p>
              </div>
            ) : (
              <form id="hero-form" onSubmit={handleSubmit} noValidate
                    aria-label="Formulario lista de espera"
                    className="flex flex-col sm:flex-row gap-2.5">
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
                  className="h-[52px] px-6 bg-salmon text-white border-none rounded-[12px]
                             font-body font-normal text-[16px] cursor-pointer whitespace-nowrap
                             tracking-[.01em] relative overflow-hidden
                             shadow-[0_4px_20px_rgba(225,165,148,.38)]
                             hover:bg-salmon-dk hover:shadow-[0_6px_26px_rgba(225,165,148,.48)]
                             active:scale-[.975] disabled:opacity-65 disabled:pointer-events-none
                             transition-all duration-200 sm:w-auto w-full"
                  style={{ WebkitAppearance: 'none' }}
                >
                  <span className="relative z-[1]">{loading ? 'Uniéndome…' : 'Unirme como Early Adopter →'}</span>
                  <span aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-br from-white/[.16] to-transparent pointer-events-none" />
                </button>
              </form>
            )}
            {/* Trust line — justo debajo del input */}
            {!success && (
              <div className="flex items-center gap-2 mt-2.5 px-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                     className="text-cream/45 flex-shrink-0" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="font-body font-light text-[.72rem] text-cream/50">
                  Sin spam · Sin tarjeta · Cancela cuando quieras
                </span>
              </div>
            )}
            {error && (
              <p className="mt-2.5 font-body font-light text-[.84rem] text-cream/88
                            bg-salmon/12 border border-salmon/26 rounded-[10px] px-[15px] py-[9px]">
                {error}
              </p>
            )}
          </div>

          {/* Explanation text */}
          <p className={`${r('d5')} font-body font-light text-[.82rem] text-cream/65 leading-[1.65] max-w-[38ch] mb-6`}>
            Apúntate ahora y consigue acceso prioritario y un badge exclusivo de Early Adopter dentro de la app en el lanzamiento.
          </p>

          {/* Countdown */}
          {/* Countdown — desktop: verde */}
          <div className={`${r('d6')} hidden lg:flex flex-wrap items-center gap-3`}
               aria-label="Cuenta atrás al lanzamiento">
            <span className="font-body font-light text-[.72rem] tracking-[.1em] uppercase text-sage-dk whitespace-nowrap">
              Lanzamiento en
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2" role="timer" aria-live="off">
              <CountdownUnit value={days}    label="días"  id="cd-d-lg" variant="green" />
              <span className="font-h1 font-bold text-[.9rem] text-sage-dk/70" aria-hidden="true">:</span>
              <CountdownUnit value={hours}   label="horas" id="cd-h-lg" variant="green" />
              <span className="font-h1 font-bold text-[.9rem] text-sage-dk/70" aria-hidden="true">:</span>
              <CountdownUnit value={minutes} label="min"   id="cd-m-lg" variant="green" />
              <span className="font-h1 font-bold text-[.9rem] text-sage-dk/70" aria-hidden="true">:</span>
              <CountdownUnit value={seconds} label="seg"   id="cd-s-lg" variant="green" />
            </div>
            <span className="font-body font-light text-[.72rem] tracking-[.1em] uppercase text-sage-dk/85 whitespace-nowrap">
              1 OCT. 2026
            </span>
          </div>

          {/* Countdown — mobile: crema */}
          <div className={`${r('d6')} lg:hidden flex flex-wrap items-center gap-3`}
               aria-label="Cuenta atrás al lanzamiento">
            <span className="font-body font-light text-[.72rem] tracking-[.1em] uppercase text-cream whitespace-nowrap">
              Lanzamiento en
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2" role="timer" aria-live="off">
              <CountdownUnit value={days}    label="días"  id="cd-d" variant="cream" />
              <span className="font-h1 font-bold text-[.9rem] text-cream/30" aria-hidden="true">:</span>
              <CountdownUnit value={hours}   label="horas" id="cd-h" variant="cream" />
              <span className="font-h1 font-bold text-[.9rem] text-cream/30" aria-hidden="true">:</span>
              <CountdownUnit value={minutes} label="min"   id="cd-m" variant="cream" />
              <span className="font-h1 font-bold text-[.9rem] text-cream/30" aria-hidden="true">:</span>
              <CountdownUnit value={seconds} label="seg"   id="cd-s" variant="cream" />
            </div>
            <span className="font-body font-light text-[.72rem] tracking-[.1em] uppercase text-cream/35 whitespace-nowrap">
              1 oct. 2026
            </span>
          </div>

          {/* Scroll hint — mobile only (desktop version is absolute at bottom of section) */}
          <div className={`${r('d6')} mt-10 flex lg:hidden flex-col items-center gap-2 text-cream/40`} aria-hidden="true">
            <span className="font-body font-light text-[.65rem] tracking-[.18em] uppercase">
              desliza
            </span>
            <div className="flex flex-col items-center gap-[3px]">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                   stroke="currentColor" strokeWidth="1.6"
                   strokeLinecap="round" strokeLinejoin="round"
                   style={{ animation: 'scrollArrow 1.8s ease-in-out infinite', animationDelay: '0s' }}>
                <polyline points="1 1 9 9 17 1"/>
              </svg>
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                   stroke="currentColor" strokeWidth="1.6" opacity="0.5"
                   strokeLinecap="round" strokeLinejoin="round"
                   style={{ animation: 'scrollArrow 1.8s ease-in-out infinite', animationDelay: '0.25s' }}>
                <polyline points="1 1 9 9 17 1"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Right column: two phone mockups (lg+) ── */}
        <div className="hidden lg:flex flex-col items-center justify-center"
             style={{ minWidth: 340, paddingBottom: 20, marginTop: -60 }}>

          {/* Logo + frase encima de los móviles */}
          <div className={`${r('d3')} flex flex-col items-center gap-3 mb-8`}>
            <img src="/logo-crema.png" alt="Wialth" className="h-28 w-auto opacity-90" />
            <span className="font-h1 font-bold text-[2rem] tracking-[-0.03em] text-cream">
              Wialth AI
            </span>
            <p className="font-body font-light text-[1rem] text-cream/60 text-center
                           max-w-[22ch] leading-[1.65] tracking-[.01em]">
              Construyendo la mejor app de finanzas personales con IA
            </p>
          </div>

          {/* Phones */}
          <div className="flex items-end justify-center" style={{ marginTop: -40 }}>
            {/* Dashboard — atrás, abajo */}
            <div style={{
              transform: 'rotate(-3deg) scale(0.84)',
              transformOrigin: 'bottom center',
              marginBottom: -76, marginRight: -55,
              zIndex: 0, flexShrink: 0,
            }}>
              <PhoneMockup />
            </div>

            {/* Chat — delante, arriba */}
            <div style={{
              transform: 'translateY(-40px) rotate(2.5deg) scale(0.84)',
              transformOrigin: 'bottom center',
              marginBottom: -76,
              zIndex: 1, flexShrink: 0,
            }}>
              <PhoneMockupChat />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll hint — desktop centered absolute ── */}
      <div className={`${r('d6')} hidden lg:flex absolute bottom-8 left-0 right-0
                       flex-col items-center gap-2 text-sage-dk z-10`} aria-hidden="true">
        <span className="font-body font-light text-[.8rem] tracking-[.18em] uppercase">
          desliza
        </span>
        <div className="flex flex-col items-center gap-[3px]">
          <svg width="26" height="14" viewBox="0 0 18 10" fill="none"
               stroke="currentColor" strokeWidth="1.6"
               strokeLinecap="round" strokeLinejoin="round"
               style={{ animation: 'scrollArrow 1.8s ease-in-out infinite', animationDelay: '0s' }}>
            <polyline points="1 1 9 9 17 1"/>
          </svg>
          <svg width="26" height="14" viewBox="0 0 18 10" fill="none"
               stroke="currentColor" strokeWidth="1.6" opacity="0.5"
               strokeLinecap="round" strokeLinejoin="round"
               style={{ animation: 'scrollArrow 1.8s ease-in-out infinite', animationDelay: '0.25s' }}>
            <polyline points="1 1 9 9 17 1"/>
          </svg>
        </div>
      </div>

      {/* ── Mobile: two phones ── */}
      <div className="lg:hidden flex flex-col items-center relative z-10 overflow-x-clip w-full">

        {/* Logo + frase encima de los móviles (mobile) */}
        <div className={`${r('d4')} flex flex-col items-center gap-2.5 mb-5 px-4`}>
          <img src="/logo-crema.png" alt="Wialth" className="h-16 w-auto opacity-90" />
          <span className="font-h1 font-bold text-[1.7rem] tracking-[-0.03em] text-cream">
            Wialth AI
          </span>
          <p className="font-body font-light text-[.92rem] text-cream/60 text-center
                         max-w-[26ch] leading-[1.6]">
            Construyendo la mejor app de finanzas personales con IA
          </p>
        </div>

        {/* Phones */}
        <div className="flex justify-center items-end pb-16 px-2">
          {/* Dashboard — atrás, abajo */}
          <div style={{
            transform: 'translateY(-56px) rotate(-3deg) scale(0.68)',
            transformOrigin: 'bottom center',
            marginRight: -85, marginBottom: -80,
            zIndex: 0, flexShrink: 0,
          }}>
            <PhoneMockup />
          </div>

          {/* Chat — delante, arriba */}
          <div style={{
            transform: 'translateY(-91px) rotate(2.5deg) scale(0.68)',
            transformOrigin: 'bottom center',
            marginBottom: -80,
            zIndex: 1, flexShrink: 0,
          }}>
            <PhoneMockupChat />
          </div>
        </div>
      </div>

    </section>
  )
}
