/**
 * /api/subscribe — Brevo (Sendinblue) waitlist handler
 *
 * Vercel serverless function.
 * Expects: POST { email: string, website: string (honeypot, must be empty) }
 * Env vars required:
 *   BREVO_API_KEY   — your Brevo v3 API key
 *   BREVO_LIST_ID   — numeric ID of the Brevo contact list (default: 3)
 */

import { promises as dns } from 'dns'

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
  // Guerrilla Mail family
  'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
  'guerrillamail.biz', 'guerrillamail.de', 'guerrillamail.info',
  'guerrillamailblock.com', 'sharklasers.com', 'grr.la', 'spam4.me',
  // Mailinator family
  'mailinator.com', 'mailinator2.com', 'tradermail.info', 'mailinater.com',
  // Yopmail
  'yopmail.com', 'yopmail.fr', 'cool.fr.nf', 'jetable.fr.nf',
  'nospam.ze.tc', 'nomail.xl.cx', 'mega.zik.dj', 'speed.1s.fr',
  // Trashmail
  'trashmail.com', 'trashmail.me', 'trashmail.at', 'trashmail.io',
  'trashmail.net', 'trashmail.org', 'trashmail.xyz',
  // Temp/throwaway
  'tempmail.com', 'temp-mail.org', 'tempmail.net', 'tempmail.io',
  'throwam.com', 'throwaway.email', 'dispostable.com', 'maildrop.cc',
  'fakeinbox.com', 'getairmail.com', 'filzmail.com', 'discard.email',
  'spamgourmet.com', 'mailnull.com', 'spamspot.com', 'tempr.email',
  // 10 minute mail
  '10minutemail.com', '10minutemail.net', '10minutemail.org',
  '10minutemail.co.uk', '10minutemail.de', '10minemail.com',
  // Others
  'mailnesia.com', 'mailnull.com', 'spamfree24.org', 'spamgob.com',
  'spamhere.org', 'spamhole.com', 'spamify.com', 'spamthis.co.uk',
  'spoofmail.de', 'super-auswahl.de', 'suremail.info', 'sweetxxx.de',
  'tafmail.com', 'tagyourself.com', 'teewars.org', 'telefonica.net',
  'teleworm.com', 'teleworm.us', 'tempalias.com', 'tempinbox.com',
  'tempinbox.co.uk', 'tempmail.it', 'tempmail2.com', 'tempmailer.com',
  'tempmailer.de', 'tempomail.fr', 'temporarily.de', 'temporarioemail.com.br',
  'temporaryemail.net', 'temporaryemail.us', 'temporaryforwarding.com',
  'temporaryinbox.com', 'temporarymailaddress.com', 'thanksnospam.info',
  'thankyou2010.com', 'thisisnotmyrealemail.com', 'throwam.com',
  'tilien.com', 'tittbit.in', 'tmail.com', 'tmailinator.com',
  'toiea.com', 'tradermail.info', 'trash-amil.com', 'trash-mail.at',
  'trash-mail.com', 'trash-mail.de', 'trash-mail.ga', 'trash-mail.io',
  'trash2009.com', 'trashemail.de', 'trashimail.com', 'trashmail.fr',
  'trashmail.me', 'trashmail.sx', 'trashmail.tk', 'trashmailer.com',
  'trashmailer.org', 'trashymails.com', 'trbvm.com', 'turual.com',
  'twinmail.de', 'tyldd.com', 'uggsrock.com', 'umail.net',
  'upliftnow.com', 'uplipht.com', 'uroid.com', 'us.af',
])

function isDisposableEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? BLOCKED_DOMAINS.has(domain) : false
}

// ── MX record check — verifies the domain can actually receive email ──────────
async function domainHasMx(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false
  try {
    const records = await dns.resolveMx(domain)
    return Array.isArray(records) && records.length > 0
  } catch {
    return false
  }
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

  // MX record check — domain must have real mail servers
  const mxValid = await domainHasMx(cleanEmail)
  if (!mxValid) {
    return res.status(400).json({ message: 'El dominio del email no es válido. Comprueba que está bien escrito.' })
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
