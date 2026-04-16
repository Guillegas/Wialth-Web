/**
 * /api/badge — Early Adopter badge image generator
 *
 * GET /api/badge?n=42  → returns a PNG badge for EA #42
 * Used in Brevo email template as:
 *   <img src="https://wialth.app/api/badge?n={{ contact.EA_NUMBER }}">
 */

import satori       from 'satori'
import { Resvg }    from '@resvg/resvg-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createElement as h } from 'react'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Star as SVG data URI — Work Sans doesn't include ★ glyph
const STAR_SVG = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="%23E1A594"/></svg>')}`

// Load fonts at module level (cached per serverless instance)
const fontWS800 = readFileSync(join(__dirname, 'fonts', 'WorkSans-ExtraBold.woff'))
const fontWS700 = readFileSync(join(__dirname, 'fonts', 'WorkSans-Bold.woff'))
const fontPR300 = readFileSync(join(__dirname, 'fonts', 'Prompt-Light.woff'))

const FONTS = [
  { name: 'Work Sans', data: fontWS800, weight: 800, style: 'normal' },
  { name: 'Work Sans', data: fontWS700, weight: 700, style: 'normal' },
  { name: 'Prompt',    data: fontPR300, weight: 300, style: 'normal' },
]

// ── Badge layout ──────────────────────────────────────────────────────────────
function badge(n) {
  const label = `#${n}`

  return h('div', {
    style: {
      width: 640, height: 300,
      display: 'flex',
      borderRadius: 20,
      padding: 3,
      background: 'linear-gradient(135deg, #c8b89a 0%, #E9E4D4 25%, #a8956e 50%, #E9E4D4 75%, #c8b89a 100%)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.38), 0 4px 16px rgba(0,0,0,0.22)',
    },
  },
    // Inner card
    h('div', {
      style: {
        flex: 1, display: 'flex',
        borderRadius: 18,
        background: 'linear-gradient(135deg, #4a6244 0%, #3d5239 40%, #2e3f2b 75%, #243320 100%)',
        overflow: 'hidden',
      },
    },

      // Left accent bar
      h('div', {
        style: {
          width: 5, flexShrink: 0,
          background: 'linear-gradient(to bottom, #E1A594, #c8956e, #E1A594)',
        },
      }),

      // Left section — star + label
      h('div', {
        style: {
          width: 96, flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 8,
          borderRight: '1px solid rgba(233,228,212,0.14)',
        },
      },
        h('img', {
          src: STAR_SVG,
          width: 34, height: 34,
          style: { width: 34, height: 34 },
        }),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 0,
          },
        },
          h('div', {
            style: {
              fontFamily: 'Prompt', fontWeight: 300,
              fontSize: 8, letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(233,228,212,0.5)',
            },
          }, 'WIALTH'),
          h('div', {
            style: {
              fontFamily: 'Prompt', fontWeight: 300,
              fontSize: 8, letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(233,228,212,0.5)',
            },
          }, 'AI'),
        ),
      ),

      // Center section
      h('div', {
        style: {
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 34px',
        },
      },
        // Pre-title
        h('div', {
          style: {
            fontFamily: 'Prompt', fontWeight: 300,
            fontSize: 9.5, letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(233,228,212,0.45)',
            marginBottom: 10,
          },
        }, 'Acceso exclusivo'),

        // Title
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } },
          h('div', {
            style: {
              fontFamily: 'Work Sans', fontWeight: 800,
              fontSize: 54, lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#E9E4D4',
            },
          }, 'Early'),
          h('div', {
            style: {
              fontFamily: 'Work Sans', fontWeight: 700,
              fontSize: 44, lineHeight: 1,
              letterSpacing: '0.05em',
              color: '#E1A594',
            },
          }, 'Adopter'),
        ),

        // Divider
        h('div', {
          style: {
            width: 44, height: 1,
            background: 'rgba(233,228,212,0.35)',
            margin: '14px 0',
          },
        }),

        // Brand
        h('div', {
          style: {
            fontFamily: 'Work Sans', fontWeight: 700,
            fontSize: 11, letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(233,228,212,0.38)',
          },
        }, 'Wialth AI'),
      ),

      // Right section
      h('div', {
        style: {
          width: 164, flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '26px 28px',
        },
      },
        // Active pill
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(233,228,212,0.08)',
            border: '1px solid rgba(233,228,212,0.18)',
            borderRadius: 999,
            padding: '5px 14px 5px 10px',
          },
        },
          h('div', {
            style: {
              width: 6, height: 6, borderRadius: '50%',
              background: '#E1A594',
            },
          }),
          h('div', {
            style: {
              fontFamily: 'Prompt', fontWeight: 300,
              fontSize: 10, letterSpacing: '0.06em',
              color: 'rgba(233,228,212,0.7)',
            },
          }, 'Activo'),
        ),

        // EA number
        h('div', {
          style: {
            fontFamily: 'Work Sans', fontWeight: 800,
            fontSize: 40, lineHeight: 1,
            letterSpacing: '-0.03em',
            color: 'rgba(233,228,212,0.13)',
          },
        }, label),
      ),
    ),
  )
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const n = Math.max(1, parseInt(req.query?.n, 10) || 1)

  try {
    const svg = await satori(badge(n), {
      width: 640, height: 300,
      fonts: FONTS,
    })

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1280 }, // 2× output
    })
    const png = resvg.render().asPng()

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.end(Buffer.from(png))

  } catch (err) {
    console.error('[badge] Error:', err)
    res.status(500).json({ message: 'Error generating badge.' })
  }
}
