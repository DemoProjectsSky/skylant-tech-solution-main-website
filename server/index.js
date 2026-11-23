// Local development server. In production the same handlers run as Vercel serverless functions (/api/*.js).
import express from 'express';
import dotenv from 'dotenv';
import sendEmail from '../api/send-email.js';
import chat from '../api/chat.js';

dotenv.config();

const app = express();
app.disable('x-powered-by');
// Handlers are plain (req, res) functions, so Express can run them directly (they do their own body parsing).
app.all('/api/send-email', (req, res) => sendEmail(req, res));
app.all('/api/chat', (req, res) => chat(req, res));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Local API server running on http://localhost:${PORT}`));
