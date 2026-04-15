/* ─────────────────────────────────────────────
   PhoneMockupChat – pantalla de chat con IA
   Misma estética que PhoneMockup
   ───────────────────────────────────────────── */

const C = {
  bg:      '#F4EFE4',
  card:    '#FFFFFF',
  dark:    '#2B2F28',
  muted:   '#8A8F85',
  green:   '#6b8064',
  greenLt: '#91A08D',
  red:     '#C98E7C',
  border:  '#E5E0D4',
  navBg:   '#FDFCF7',
  userBubble: '#dce8d9',
  aiBubble:   '#FFFFFF',
}

const messages = [
  { role: 'user', text: '¿Cuánto puedo ahorrar este mes?' },
  { role: 'ai',   text: 'Con tus patrones actuales podrías ahorrar €280. Reduciendo en Ocio llegarías a €325 este mes 🎯' },
  { role: 'user', text: '¿Y para el viaje a Roma?' },
  { role: 'ai',   text: 'En 4 meses tendrías €1.300 para Roma. ¿Quieres que cree el objetivo de ahorro?' },
]

function SignalIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <rect x="0"   y="5"   width="2" height="3" rx=".5" fill={C.muted} />
      <rect x="2.5" y="3.5" width="2" height="4.5" rx=".5" fill={C.muted} />
      <rect x="5"   y="2"   width="2" height="6" rx=".5" fill={C.muted} />
      <rect x="7.5" y="0"   width="2" height="8" rx=".5" fill={C.muted} />
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
      <rect x=".5"  y=".5"  width="11" height="6" rx="1.5" stroke={C.muted} />
      <rect x="1.5" y="1.5" width="8"  height="4" rx=".5"  fill={C.muted} />
      <path d="M12 2.5v2a1 1 0 000-2z" fill={C.muted} />
    </svg>
  )
}

function NavIcon({ name, color }) {
  const s = { stroke: color, fill: 'none', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (name === 'home')
    return <svg width="14" height="14" viewBox="0 0 24 24" {...s}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  if (name === 'map-pin')
    return <svg width="14" height="14" viewBox="0 0 24 24" {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  if (name === 'message')
    return <svg width="14" height="14" viewBox="0 0 24 24" {...s}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  if (name === 'user')
    return <svg width="14" height="14" viewBox="0 0 24 24" {...s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  return null
}

export default function PhoneMockupChat() {
  return (
    <div className="animate-phone-in" style={{ animationDelay: '0.15s' }}>
      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-[44px] bg-salmon/15 blur-3xl animate-glow-pulse scale-110" />

      {/* Phone frame */}
      <div
        className="relative w-[220px] rounded-[36px] bg-hero-deep
                   shadow-[0_32px_80px_rgba(26,40,24,.60),0_0_0_1px_rgba(145,160,141,.25)]"
        style={{ aspectRatio: '9/19.5' }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[72px] h-[20px] bg-[#1a271a] rounded-full z-10" />

        {/* Screen */}
        <div
          className="absolute inset-[3px] rounded-[33px] overflow-hidden flex flex-col"
          style={{ background: C.bg }}
        >
          {/* ── Status bar ── */}
          <div className="flex items-center justify-between px-4 pt-8 pb-1">
            <span style={{ color: C.muted, fontSize: 7, fontFamily: 'Prompt' }}>9:41</span>
            <div className="flex items-center gap-1">
              <SignalIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* ── Chat header ── */}
          <div style={{
            background: C.card, borderBottom: `1px solid ${C.border}`,
            padding: '7px 14px 8px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {/* AI avatar — color liso */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.green}, ${C.greenLt})`,
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <p style={{ color: C.dark, fontSize: 8.5, fontFamily: 'Work Sans', fontWeight: 600, lineHeight: 1.2 }}>
                Wialth AI
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#5ab87a' }} />
                <span style={{ color: C.muted, fontSize: 6, fontFamily: 'Prompt', fontWeight: 300 }}>
                  En línea
                </span>
              </div>
            </div>
            {/* Info icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>

          {/* ── Date label ── */}
          <div style={{ textAlign: 'center', padding: '7px 0 4px' }}>
            <span style={{
              color: C.muted, fontSize: 5.5, fontFamily: 'Prompt', fontWeight: 300,
              background: 'rgba(139,143,133,.10)', borderRadius: 8,
              padding: '2px 8px',
            }}>
              Hoy
            </span>
          </div>

          {/* ── Messages ── */}
          <div style={{ flex: 1, overflowY: 'hidden', padding: '4px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                {/* AI avatar dot */}
                {msg.role === 'ai' && (
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${C.green}, ${C.greenLt})`,
                    marginRight: 4, marginTop: 2,
                      }} />
                )}
                <div style={{
                  maxWidth: '76%',
                  background: msg.role === 'user' ? C.userBubble : C.aiBubble,
                  border: `1px solid ${msg.role === 'user' ? 'rgba(107,128,100,.20)' : C.border}`,
                  borderRadius: msg.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                  padding: '5px 7px',
                }}>
                  <p style={{
                    color: C.dark, fontSize: 6.5, fontFamily: 'Prompt', fontWeight: 300,
                    lineHeight: 1.55, margin: 0,
                  }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${C.green}, ${C.greenLt})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 7, fontFamily: 'Work Sans', fontWeight: 700 }}>W</span>
              </div>
              <div style={{
                background: C.aiBubble, border: `1px solid ${C.border}`,
                borderRadius: '12px 12px 12px 3px',
                padding: '6px 10px', display: 'flex', gap: 3, alignItems: 'center',
              }}>
                {[0, 0.25, 0.5].map(delay => (
                  <div key={delay} style={{
                    width: 4, height: 4, borderRadius: '50%', background: C.muted,
                    animation: 'typingDot 1.2s ease-in-out infinite',
                    animationDelay: `${delay}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Input bar ── */}
          <div style={{
            borderTop: `1px solid ${C.border}`,
            background: C.card,
            padding: '6px 10px 8px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{
              flex: 1, height: 26, background: C.bg,
              border: `1px solid ${C.border}`, borderRadius: 20,
              display: 'flex', alignItems: 'center', paddingLeft: 9,
            }}>
              <span style={{ color: C.muted, fontSize: 6, fontFamily: 'Prompt', fontWeight: 300 }}>
                Pregunta algo...
              </span>
            </div>
            {/* Send button */}
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: C.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                   stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div style={{
            borderTop: `1px solid ${C.border}`,
            background: C.navBg,
            display: 'flex', justifyContent: 'space-around',
            padding: '7px 0 12px',
          }}>
            {[
              { icon: 'home',    label: 'Home',    active: false },
              { icon: 'map-pin', label: 'Roadmap', active: false },
              { icon: 'message', label: 'Coach',   active: true  },
              { icon: 'user',    label: 'Profile', active: false },
            ].map(({ icon, label, active }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <NavIcon name={icon} color={active ? C.green : C.muted} />
                <span style={{
                  color: active ? C.green : C.muted,
                  fontSize: 5.5, fontFamily: 'Prompt', fontWeight: active ? 500 : 300,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>{/* /screen */}
      </div>{/* /frame */}
    </div>
  )
}
