// Shared helpers for the serverless functions (and the local dev server).
// Files starting with "_" inside /api are NOT deployed as public endpoints by Vercel.

const hits = new Map(); // key -> [timestamps]. Per server instance: a basic brake against floods, not a full anti-abuse system.

/** Allows `limit` calls per `windowMs` for this key. Returns false when the caller must wait. */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((time) => now - time < windowMs)) hits.delete(k); // keep memory bounded
  return true;
}

export const clientIp = (req) => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();

/**
 * Origin check + CORS. Browsers always send Origin on cross-site POSTs, so unknown origins are refused.
 * ALLOWED_ORIGINS="https://skylant.example,https://www.skylant.example". When empty, only same-host requests pass.
 * Returns true when the request may continue.
 */
export function guardOrigin(req, res) {
  const origin = req.headers.origin;
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (origin) {
    let sameHost = false;
    try { sameHost = new URL(origin).host === req.headers.host; } catch { /* malformed Origin */ }
    if (!sameHost && !allowed.includes(origin)) { res.status(403).json({ error: 'This origin is not allowed.' }); return false; }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') { res.status(204).end(); return false; }
  return true;
}

export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
/** One line of plain text: no control characters or line breaks (prevents email header injection in subjects). */
export const oneLine = (value, max = 120) => String(value ?? '').replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max);
export const isEmail = (value) => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
