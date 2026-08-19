import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

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

    const get = (k) => (Array.isArray(fields[k]) ? fields[k][0] : fields[k]) || '';
    const type = get('type');

    const attachments = [];
    if (files.resume) {
      const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      attachments.push({
        filename: file.originalFilename,
        content: fs.createReadStream(file.filepath),
      });
    }

    const subject =
      type === 'career'
        ? `New Job Application: ${get('role')}`
        : `New Contact Form: ${get('name')}`;

    const html =
      type === 'career'
        ? `<h2>New Job Application</h2>
           <p><b>Name:</b> ${get('name')}</p>
           <p><b>Email:</b> ${get('email')}</p>
           <p><b>Phone:</b> ${get('phone')}</p>
           <p><b>Role:</b> ${get('role')}</p>
           <p><b>Message:</b><br/>${get('message')}</p>`
        : `<h2>New Contact Form Submission</h2>
           <p><b>Name:</b> ${get('name')}</p>
           <p><b>Email:</b> ${get('email')}</p>
           <p><b>Company:</b> ${get('company')}</p>
           <p><b>Phone:</b> ${get('phone')}</p>
           <p><b>Service:</b> ${get('service')}</p>
           <p><b>Message:</b><br/>${get('message')}</p>`;

    await transporter.sendMail({
      from: `"Skylant Website" <${process.env.SMTP_USER}>`,
      to: 'hr.skylant@gmail.com',
      replyTo: get('email'),
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