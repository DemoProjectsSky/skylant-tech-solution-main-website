import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Only allow the configured website origin(s). Set ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r?\n/g, '<br/>');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/send-email', upload.single('resume'), async (req, res) => {
  try {

    const { type, name, email, phone, message, role, company, service } = req.body;

    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      });
    }

    const subject =
      type === 'career'
        ? `New Job Application: ${String(role).replace(/[\r\n]/g, ' ')}`
        : `New Contact Form: ${String(name).replace(/[\r\n]/g, ' ')}`;

    const html =
      type === 'career'
        ? `<h2>New Job Application</h2>
           <p><b>Name:</b> ${escapeHtml(name)}</p>
           <p><b>Email:</b> ${escapeHtml(email)}</p>
           <p><b>Phone:</b> ${escapeHtml(phone)}</p>
           <p><b>Role:</b> ${escapeHtml(role)}</p>
           <p><b>Message:</b><br/>${escapeHtml(message)}</p>`
        : `<h2>New Contact Form Submission</h2>
           <p><b>Name:</b> ${escapeHtml(name)}</p>
           <p><b>Email:</b> ${escapeHtml(email)}</p>
           <p><b>Company:</b> ${escapeHtml(company)}</p>
           <p><b>Phone:</b> ${escapeHtml(phone)}</p>
           <p><b>Service:</b> ${escapeHtml(service)}</p>
           <p><b>Message:</b><br/>${escapeHtml(message)}</p>`;

    await transporter.sendMail({
      from: `"Skylant Website" <${process.env.SMTP_USER}>`,
      to: 'hr.skylant@gmail.com',
      replyTo: String(email || '').replace(/[\r\n]/g, ''),
      subject,
      html,
      attachments,
    });

        res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-email error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`✅ Local email server running on http://localhost:${PORT}`));