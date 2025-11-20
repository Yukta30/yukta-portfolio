// /api/contact/route.js  (or pages/api/contact.js if using Pages router)
import { Resend } from 'resend';

export const config = { runtime: 'nodejs' }; // for Route Handlers, omit on Next 14 default

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const { name = '', email = '', message = '' } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      // During testing with a free key, use your verified address as recipient.
      to: ['yukta.vajpayee@sjsu.edu'],
      // If you haven't verified a custom domain yet, keep this "from" as Resend’s default.
      from: 'Acme <onboarding@resend.dev>',
      reply_to: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`
    });

    if (error) return res.status(500).json({ ok: false, error: error.message || String(error) });
    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || 'Error' });
  }
}
