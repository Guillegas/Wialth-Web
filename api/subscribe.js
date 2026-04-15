/**
 * /api/subscribe — Brevo (Sendinblue) waitlist handler
 *
 * Vercel serverless function.
 * Expects: POST { email: string, website: string (honeypot, must be empty) }
 * Env vars required:
 *   BREVO_API_KEY   — your Brevo v3 API key
 *   BREVO_LIST_ID   — numeric ID of the Brevo contact list (default: 3)
 */

// ── In-memory rate limiter (per serverless instance) ──────────────────────────
// Limits each IP to MAX_REQUESTS attempts within WINDOW_MS.
// Note: resets on cold starts — sufficient for landing page abuse prevention.
const WINDOW_MS    = 60_000   // 1 minute
const MAX_REQUESTS = 3
const ipMap        = new Map()

function isRateLimited(ip) {
  const now  = Date.now()
  const entry = ipMap.get(ip) ?? { count: 0, start: now }

  if (now - entry.start > WINDOW_MS) {
    ipMap.set(ip, { count: 1, start: now })
    return false
  }

  if (entry.count >= MAX_REQUESTS) return true

  entry.count++
  ipMap.set(ip, entry)
  return false
}

// ── Disposable / throwaway email domains blocklist ────────────────────────────
const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'guerrillamail.info',
  'spam4.me', 'trashmail.com', 'yopmail.com', 'dispostable.com',
  'maildrop.cc', 'fakeinbox.com', 'getairmail.com', 'filzmail.com',
  'discard.email', 'spamgourmet.com', 'trashmail.me', 'trashmail.at',
  'tempr.email', 'dispostable.com', 'mailnull.com', 'spamspot.com',
])

function isDisposableEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? BLOCKED_DOMAINS.has(domain) : false
}

// ── Allowed origins ───────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://wialth.app',
  'https://www.wialth.app',
])

function getAllowedOrigin(reqOrigin) {
  if (!reqOrigin) return null
  if (ALLOWED_ORIGINS.has(reqOrigin)) return reqOrigin
  // Allow localhost in development
  if (process.env.NODE_ENV !== 'production' && reqOrigin.startsWith('http://localhost')) {
    return reqOrigin
  }
  return null
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  const origin = getAllowedOrigin(req.headers.origin)
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }

  if (req.method === 'OPTIONS') return res.status(204).end()

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  // Content-Type check
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(415).json({ message: 'Unsupported media type.' })
  }

  // Rate limiting by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Demasiados intentos. Espera un momento.' })
  }

  const { email, website } = req.body ?? {}

  // Honeypot — bots fill this field, humans don't
  if (website) {
    // Silently return success to not reveal the check to bots
    return res.status(200).json({ message: 'Suscrito correctamente.' })
  }

  // Validate email
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!email || typeof email !== 'string' || !emailRx.test(email.trim())) {
    return res.status(400).json({ message: 'Por favor, introduce un email válido.' })
  }

  const cleanEmail = email.trim().toLowerCase()

  // Block disposable email domains
  if (isDisposableEmail(cleanEmail)) {
    return res.status(400).json({ message: 'Por favor, usa un email real.' })
  }

  // Check env vars
  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const LIST_ID       = parseInt(process.env.BREVO_LIST_ID ?? '3', 10)

  if (!BREVO_API_KEY) {
    console.error('[subscribe] BREVO_API_KEY is not set')
    return res.status(500).json({ message: 'Configuración del servidor incompleta.' })
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key':      BREVO_API_KEY,
      },
      body: JSON.stringify({
        email:         cleanEmail,
        listIds:       [LIST_ID],
        updateEnabled: true,
      }),
    })

    if (brevoRes.status === 201 || brevoRes.status === 204) {
      return res.status(200).json({ message: 'Suscrito correctamente.' })
    }

    const brevoData = await brevoRes.json().catch(() => ({}))

    if (brevoRes.status === 400 && brevoData?.code === 'duplicate_parameter') {
      return res.status(200).json({ message: 'Ya estás en la lista. ¡Gracias!' })
    }

    console.error('[subscribe] Brevo error:', brevoRes.status, brevoData)
    return res.status(500).json({ message: 'Error al suscribir. Inténtalo de nuevo.' })

  } catch (err) {
    console.error('[subscribe] Network error:', err)
    return res.status(500).json({ message: 'Error del servidor. Inténtalo más tarde.' })
  }
}
