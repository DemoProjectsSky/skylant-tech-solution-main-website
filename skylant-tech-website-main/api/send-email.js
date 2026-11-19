import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};


// Escape user input before placing it in the HTML email body (prevents HTML/script injection).
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r?\n/g, '<br/>');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_RESUME_EXT = ['.pdf', '.doc', '.docx'];

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const get = (k) => String((Array.isArray(fields[k]) ? fields[k][0] : fields[k]) || '').trim().slice(0, 5000);
    const type = get('type');

    if (!get('name') || !EMAIL_RE.test(get('email'))) {
      return res.status(400).json({ error: 'Please provide a valid name and email address.' });
    }

    const attachments = [];
    if (files.resume) {
      const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      const lower = String(file.originalFilename || '').toLowerCase();
      if (!ALLOWED_RESUME_EXT.some((ext) => lower.endsWith(ext))) {
        return res.status(400).json({ error: 'Resume must be a PDF, DOC or DOCX file.' });
      }
      attachments.push({
        filename: file.originalFilename,
        content: fs.createReadStream(file.filepath),
      });
    }

    const subject =
      type === 'career'
        ? `New Job Application: ${get('role').replace(/[\r\n]/g, ' ')}`
        : `New Contact Form: ${get('name').replace(/[\r\n]/g, ' ')}`;

    const html =
      type === 'career'
        ? `<h2>New Job Application</h2>
           <p><b>Name:</b> ${escapeHtml(get('name'))}</p>
           <p><b>Email:</b> ${escapeHtml(get('email'))}</p>
           <p><b>Phone:</b> ${escapeHtml(get('phone'))}</p>
           <p><b>Role:</b> ${escapeHtml(get('role'))}</p>
           <p><b>Message:</b><br/>${escapeHtml(get('message'))}</p>`
        : `<h2>New Contact Form Submission</h2>
           <p><b>Name:</b> ${escapeHtml(get('name'))}</p>
           <p><b>Email:</b> ${escapeHtml(get('email'))}</p>
           <p><b>Company:</b> ${escapeHtml(get('company'))}</p>
           <p><b>Phone:</b> ${escapeHtml(get('phone'))}</p>
           <p><b>Service:</b> ${escapeHtml(get('service'))}</p>
           <p><b>Message:</b><br/>${escapeHtml(get('message'))}</p>`;

    await transporter.sendMail({
      from: `"Skylant Website" <${process.env.SMTP_USER}>`,
      to: 'hr.skylant@gmail.com',
      replyTo: get('email').replace(/[\r\n]/g, ''),
      subject,
      html,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}