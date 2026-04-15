/* ─────────────────────────────────────────────
   PhoneMockup – replica del diseño de la app
   ───────────────────────────────────────────── */

const C = {
  bg:      '#F4EFE4',
  card:    '#FFFFFF',
  cardAlt: '#F5F0E6',
  dark:    '#2B2F28',
  muted:   '#8A8F85',
  green:   '#6b8064',
  greenLt: '#91A08D',
  red:     '#C98E7C',
  border:  '#E5E0D4',
  navBg:   '#FDFCF7',
}

/* ── Dashed ring for Income / Expenses ── */
function CircleRing({ color, icon, size = 52 }) {
  const cx = size / 2, r = size / 2 - 4
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* faint outer ring */}
      <circle cx={cx} cy={cx} r={r} fill="none"
              stroke={C.border} strokeWidth="1.4" strokeDasharray="3.5 2.5" />
      {/* colored dashed ring */}
      <circle cx={cx} cy={cx} r={r} fill="none"
              stroke={color} strokeWidth="1.6" strokeDasharray="3.5 2.5" opacity="0.75" />
      {/* trend icon */}
      {icon === 'up' ? (
        <path d={`M${cx-5} ${cx+3} L${cx} ${cx-4} L${cx+5} ${cx+3}`}
              fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M${cx-5} ${cx-3} L${cx} ${cx+4} L${cx+5} ${cx-3}`}
              fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

/* ── Small progress ring for cards ── */
function SmallRing({ percent, color, label, icon }) {
  const size = 44, cx = 22, r = 17
  const circ = 2 * Math.PI * r       // ≈ 106.8
  const filled = circ * (percent / 100)
  const offset = -circ / 4           // start from top

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* track */}
      <circle cx={cx} cy={cx} r={r} fill="none"
              stroke={C.border} strokeWidth="2.2" strokeDasharray="3 2" />
      {/* progress */}
      <circle cx={cx} cy={cx} r={r} fill="none"
              stroke={color} strokeWidth="2.2"
              strokeDasharray={`${filled} ${circ}`}
              strokeDashoffset={offset}
              strokeLinecap="round" />
      {/* center: icon or label */}
      {icon === 'target' ? (
        <>
          <circle cx={cx} cy={cx} r="5" fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx={cx} cy={cx} r="2" fill={color} />
        </>
      ) : (
        <text x={cx} y={cx + 3.5} textAnchor="middle"
              fontSize="8.5" fontWeight="700" fill={C.dark} fontFamily="Work Sans, sans-serif">
          {label}
        </text>
      )}
    </svg>
  )
}

/* ── Bottom nav icon ── */
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

/* ── Status bar icons ── */
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
      <rect x="1.5" y="1.5" width="7"  height="4" rx=".5"  fill={C.muted} />
      <path d="M12 2.5v2a1 1 0 000-2z" fill={C.muted} />
    </svg>
  )
}

/* ═══════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════ */
export default function PhoneMockup() {
  /* Arc geometry (r=80, viewBox 200×100) */
  const arcR = 80, arcCX = 100, arcCY = 96
  const arcCirc = Math.PI * arcR   // semicircle ≈ 251.3
  const arcFill = arcCirc * 0.66   // ~66% filled

  return (
    <div className="animate-phone-in" style={{ position: 'relative' }}>
      {/* Glow behind phone */}
      <div className="absolute inset-0 -z-10 rounded-[44px] bg-sage/20 blur-3xl animate-glow-pulse scale-110" />

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

          {/* ── Header ── */}
          <div className="flex items-start justify-between px-4 pt-0.5 pb-2">
            <div>
              <p style={{ color: C.muted, fontSize: 7, fontFamily: 'Prompt', fontWeight: 300 }}>April 2026</p>
              <p style={{ color: C.dark, fontSize: 15, fontFamily: 'Work Sans', fontWeight: 700, lineHeight: 1.15 }}>
                Hola, Guille
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                 style={{ marginTop: 4 }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>

          {/* ── Income / Expenses rings + Arc gauge ── */}
          <div style={{ position: 'relative', height: 138, marginBottom: 6 }}>

            {/* Income ring – top left */}
            <div style={{ position: 'absolute', top: 0, left: 14, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircleRing color={C.green} icon="up" />
              <p style={{ color: C.dark, fontSize: 9, fontFamily: 'Work Sans', fontWeight: 700, marginTop: 2, lineHeight: 1 }}>€2150</p>
              <p style={{ color: C.muted, fontSize: 6.5, fontFamily: 'Prompt', fontWeight: 300, marginTop: 1 }}>Income</p>
            </div>

            {/* Expenses ring – top right */}
            <div style={{ position: 'absolute', top: 0, right: 14, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircleRing color={C.red} icon="down" />
              <p style={{ color: C.dark, fontSize: 9, fontFamily: 'Work Sans', fontWeight: 700, marginTop: 2, lineHeight: 1 }}>€1420</p>
              <p style={{ color: C.muted, fontSize: 6.5, fontFamily: 'Prompt', fontWeight: 300, marginTop: 1 }}>Expenses</p>
            </div>

            {/* Big arc gauge – centered, bottom of section */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
              <svg width="190" height="100" viewBox="0 0 200 100">
                {/* background track */}
                <path
                  d={`M ${arcCX - arcR} ${arcCY} A ${arcR} ${arcR} 0 0 1 ${arcCX + arcR} ${arcCY}`}
                  fill="none" stroke={C.border} strokeWidth="6.5" strokeLinecap="round"
                />
                {/* filled arc */}
                <path
                  d={`M ${arcCX - arcR} ${arcCY} A ${arcR} ${arcR} 0 0 1 ${arcCX + arcR} ${arcCY}`}
                  fill="none" stroke={C.dark} strokeWidth="6.5" strokeLinecap="round"
                  strokeDasharray={`${arcFill} ${arcCirc}`}
                />
                {/* center value */}
                <text x={arcCX} y={arcCY - 22} textAnchor="middle"
                      fontSize="26" fontWeight="700" fill={C.dark} fontFamily="Work Sans, sans-serif"
                      opacity="0.88">
                  €730
                </text>
                <text x={arcCX} y={arcCY - 9} textAnchor="middle"
                      fontSize="7.5" fill={C.muted} fontFamily="Prompt, sans-serif" fontWeight="300">
                  Available
                </text>
              </svg>
            </div>
          </div>

          {/* ── Two info cards ── */}
          <div style={{ display: 'flex', gap: 7, paddingLeft: 12, paddingRight: 12, marginBottom: 7 }}>

            {/* Savings Goal */}
            <div style={{
              flex: 1, background: C.card, borderRadius: 12,
              border: `1px solid ${C.border}`, padding: '8px 8px 8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                <SmallRing percent={78} color={C.green} label="78%" />
              </div>
              <p style={{ color: C.dark, fontSize: 7.5, fontFamily: 'Work Sans', fontWeight: 600, lineHeight: 1.25 }}>
                Savings Goal
              </p>
              <p style={{ color: C.muted, fontSize: 6, fontFamily: 'Prompt', fontWeight: 300, marginTop: 1 }}>
                €390 / €500
              </p>
              <p style={{ color: C.muted, fontSize: 6, fontFamily: 'Prompt', fontWeight: 300 }}>
                €110 left
              </p>
            </div>

            {/* Month Score */}
            <div style={{
              flex: 1, background: C.card, borderRadius: 12,
              border: `1px solid ${C.border}`, padding: '8px 8px 8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                <SmallRing percent={68} color={C.red} label="68" icon="target" />
              </div>
              <p style={{ color: C.dark, fontSize: 7.5, fontFamily: 'Work Sans', fontWeight: 600, lineHeight: 1.25 }}>
                Month Score
              </p>
              <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { label: 'Savings',  color: C.green,   w: 72 },
                  { label: 'Spending', color: '#C9A84C',  w: 50 },
                  { label: 'Goal',     color: C.greenLt,  w: 36 },
                ].map(({ label, color, w }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: w * 0.55, height: 2, borderRadius: 1, background: color, flexShrink: 0 }} />
                    <span style={{ color: C.muted, fontSize: 5.5, fontFamily: 'Prompt', whiteSpace: 'nowrap' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Emergency Fund card ── */}
          <div style={{
            marginLeft: 12, marginRight: 12,
            background: C.card, borderRadius: 12,
            border: `1px solid ${C.border}`, overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Shield icon */}
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: '#EDF2EB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                       stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: C.dark, fontSize: 8, fontFamily: 'Work Sans', fontWeight: 600, lineHeight: 1.2 }}>
                    Emergency Fund
                  </p>
                  <p style={{ color: C.muted, fontSize: 5.8, fontFamily: 'Prompt', fontWeight: 300, marginTop: 1 }}>
                    €1,176 / €8,400 · 4 months
                  </p>
                </div>
              </div>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                   stroke={C.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, padding: '5px 10px 7px' }}>
              <p style={{ color: C.muted, fontSize: 6, fontFamily: 'Prompt', fontWeight: 300, fontStyle: 'italic' }}>
                Save €150 this week to stay on track
              </p>
            </div>
          </div>

          {/* ── Spacer ── */}
          <div style={{ flex: 1 }} />

          {/* ── Bottom nav ── */}
          <div style={{
            borderTop: `1px solid ${C.border}`,
            background: C.navBg,
            display: 'flex', justifyContent: 'space-around',
            padding: '7px 0 12px',
          }}>
            {[
              { icon: 'home',    label: 'Home',     active: true  },
              { icon: 'map-pin', label: 'Roadmap',  active: false },
              { icon: 'message', label: 'Coach',    active: false },
              { icon: 'user',    label: 'Profile',  active: false },
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
