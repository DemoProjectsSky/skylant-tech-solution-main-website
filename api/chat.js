import { clientIp, guardOrigin, rateLimit } from './_lib/http.js';

const SYSTEM_PROMPT = 'You are Skylant AI, a helpful assistant for Skylant Technologies. Answer briefly, professionally and in a friendly tone. Focus on software development, web and mobile apps, AI solutions, cloud, digital marketing, training and internships. If you do not know something, suggest contacting the team through the Contact page.';

/**
 * Server-side proxy for the website assistant. The Groq key lives ONLY here (GROQ_API_KEY),
 * never in the browser bundle (anything named VITE_* is public).
 */
export default async function handler(req, res) {
  if (!guardOrigin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.GROQ_API_KEY) return res.status(503).json({ error: 'The assistant is not available right now.' });
  if (!rateLimit(`chat:${clientIp(req)}`, Number(process.env.CHAT_RATE_LIMIT) || 20, 10 * 60 * 1000)) return res.status(429).json({ error: 'You are sending messages too quickly. Please wait a moment.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body && req.on) { // plain Node/Express request without a body parser
    body = await new Promise((resolve) => { let raw = ''; req.on('data', (c) => { raw += c; if (raw.length > 5000) req.destroy(); }); req.on('end', () => { try { resolve(JSON.parse(raw)); } catch { resolve(null); } }); req.on('error', () => resolve(null)); });
  }
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > 500) return res.status(400).json({ error: 'Please send a message of up to 500 characters.' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({ model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant', messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: message }], temperature: 0.7, max_tokens: 250 }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`upstream ${response.status}`);
    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({ reply: reply || 'Sorry, I could not generate a response right now.' });
  } catch (error) {
    console.error('chat error:', error?.message);
    return res.status(502).json({ error: 'The assistant is having trouble right now.' });
  }
}
