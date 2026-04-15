/**
 * /api/subscribe — Brevo (Sendinblue) waitlist handler
 *
 * Vercel serverless function.
 * Expects: POST { email: string }
 * Env vars required:
 *   BREVO_API_KEY   — your Brevo v3 API key
 *   BREVO_LIST_ID   — numeric ID of the Brevo contact list (default: 2)
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  // Parse body (Vercel parses JSON automatically when Content-Type is application/json)
  const { email } = req.body ?? {};

  // Validate email
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRx.test(email.trim())) {
    return res.status(400).json({ message: 'Por favor, introduce un email válido.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check env vars
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID       = parseInt(process.env.BREVO_LIST_ID ?? '2', 10);

  if (!BREVO_API_KEY) {
    console.error('[subscribe] BREVO_API_KEY is not set');
    return res.status(500).json({ message: 'Configuración del servidor incompleta.' });
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
        updateEnabled: true,  // update instead of error if contact already exists
      }),
    });

    // 201 = created, 204 = updated (updateEnabled)
    if (brevoRes.status === 201 || brevoRes.status === 204) {
      return res.status(200).json({ message: 'Suscrito correctamente.' });
    }

    const brevoData = await brevoRes.json().catch(() => ({}));

    // Brevo may return 400 with duplicate_parameter even with updateEnabled on edge cases
    if (brevoRes.status === 400 && brevoData?.code === 'duplicate_parameter') {
      return res.status(200).json({ message: 'Ya estás en la lista. ¡Gracias!' });
    }

    console.error('[subscribe] Brevo error:', brevoRes.status, brevoData);
    return res.status(500).json({ message: 'Error al suscribir. Inténtalo de nuevo.' });

  } catch (err) {
    console.error('[subscribe] Network error:', err);
    return res.status(500).json({ message: 'Error del servidor. Inténtalo más tarde.' });
  }
}
