import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { clientIp, escapeHtml, guardOrigin, isEmail, oneLine, rateLimit } from './_lib/http.js';

export const config = { api: { bodyParser: false } };

const MAX_FILE = 5 * 1024 * 1024;
const ALLOWED_RESUME = { '.pdf': (b) => b.subarray(0, 4).toString('latin1') === '%PDF', '.doc': (b) => b.subarray(0, 4).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0])), '.docx': (b) => b.subarray(0, 2).toString('latin1') === 'PK' };

/** Created per call so SMTP settings are always read from the current environment. */
function makeTransporter() {
  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST, port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
}

const first = (fields, key) => String((Array.isArray(fields[key]) ? fields[key][0] : fields[key]) ?? '').trim();
const row = (label, value) => `<p><b>${label}:</b> ${escapeHtml(value) || '-'}</p>`;

export default async function handler(req, res) {
  if (!guardOrigin(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!rateLimit(`mail:${clientIp(req)}`, Number(process.env.MAIL_RATE_LIMIT) || 5, 10 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many messages from your network. Please try again in a few minutes.' });
  }

  let uploaded;
  try {
    const form = formidable({ multiples: false, maxFileSize: MAX_FILE, maxFiles: 1, maxFields: 25, maxFieldsSize: 50 * 1024 });
    const [fields, files] = await form.parse(req);

    if (first(fields, 'website')) return res.status(200).json({ success: true }); // honeypot: bots fill it, people never see it

    const type = first(fields, 'type');
    const name = oneLine(first(fields, 'name'), 100);
    const email = first(fields, 'email').toLowerCase();
    const phone = oneLine(first(fields, 'phone'), 25);
    const message = first(fields, 'message').slice(0, 5000);
    const role = oneLine(first(fields, 'role'), 100);
    const company = oneLine(first(fields, 'company'), 120);
    const service = oneLine(first(fields, 'service'), 120);

    const bad = (error) => res.status(400).json({ error });
    if (!['contact', 'career'].includes(type)) return bad('Invalid request.');
    if (name.length < 2) return bad('Please enter your name.');
    if (!isEmail(email)) return bad('Please enter a valid email address.');
    if (phone && !/^[0-9+()\-\s.]{7,25}$/.test(phone)) return bad('Please enter a valid phone number.');
    if (type === 'contact' && message.length < 5) return bad('Please enter your message.');
    if (type === 'career' && !role) return bad('Please choose the role you are applying for.');

    const attachments = [];
    const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
    if (file) {
      uploaded = file.filepath;
      const ext = path.extname(file.originalFilename || '').toLowerCase();
      const data = fs.readFileSync(file.filepath);
      if (!ALLOWED_RESUME[ext] || !data.length || !ALLOWED_RESUME[ext](data)) return bad('Please attach your resume as a PDF, DOC or DOCX file (up to 5 MB).');
      attachments.push({ filename: `resume-${name.replace(/[^\w.-]+/g, '_').slice(0, 40)}${ext}`, content: data }); // never reuse the visitor's file name
    } else if (type === 'career' && String(first(fields, 'resumeRequired')) === 'true') {
      return bad('Please attach your resume.');
    }

    const subject = type === 'career' ? `New Job Application: ${role}` : `New Contact Form: ${name}`;
    const html = type === 'career'
      ? `<h2>New Job Application</h2>${row('Name', name)}${row('Email', email)}${row('Phone', phone)}${row('Role', role)}<p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`
      : `<h2>New Contact Form Submission</h2>${row('Name', name)}${row('Email', email)}${row('Company', company)}${row('Phone', phone)}${row('Service', service)}<p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`;

    await makeTransporter().sendMail({
      from: `"Skylant Website" <${process.env.MAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || 'hr.skylant@gmail.com',
      replyTo: email,
      subject, html, attachments,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    if (error?.code === 1009 || /maxFileSize/i.test(error?.message || '')) return res.status(413).json({ error: 'The file is too large (max 5 MB).' });
    console.error('send-email error:', error?.message); // never log submitted personal data
    return res.status(500).json({ error: 'Failed to send your message. Please try again or contact us on WhatsApp.' });
  } finally {
    if (uploaded) fs.promises.unlink(uploaded).catch(() => undefined); // remove the temp upload
  }
}
