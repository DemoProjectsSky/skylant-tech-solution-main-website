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

app.use(cors());

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
    console.log('--- New request received ---');
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    const { type, name, email, phone, message, role, company, service } = req.body;

    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      });
      console.log('Attachment prepared:', req.file.originalname, req.file.mimetype, req.file.size, 'bytes');
    } else {
      console.log('No file received in this request.');
    }

    const subject =
      type === 'career'
        ? `New Job Application: ${role}`
        : `New Contact Form: ${name}`;

    const html =
      type === 'career'
        ? `<h2>New Job Application</h2>
           <p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Phone:</b> ${phone}</p>
           <p><b>Role:</b> ${role}</p>
           <p><b>Message:</b><br/>${message}</p>`
        : `<h2>New Contact Form Submission</h2>
           <p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Company:</b> ${company}</p>
           <p><b>Phone:</b> ${phone}</p>
           <p><b>Service:</b> ${service}</p>
           <p><b>Message:</b><br/>${message}</p>`;

    const info = await transporter.sendMail({
      from: `"Skylant Website" <${process.env.SMTP_USER}>`,
      to: 'hr.skylant@gmail.com',
      replyTo: email,
      subject,
      html,
      attachments,
    });

    console.log('Email sent:', info.messageId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-email error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Local email server running on http://localhost:${PORT}`));