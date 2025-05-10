import 'dotenv/config';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import juice from 'juice';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host:   'smtp.gmail.com',
  port:    465,
  secure:  true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendCTFInvitation() {
  // 1) Load your HTML template
  const htmlPath = path.join(__dirname, 'gmail.html');
  let html = await fs.readFile(htmlPath, 'utf8');

  const inlineHtml = juice(html);

  // 5) Send mail (no CSS attachment needed—styles are inlined)
  const info = await transporter.sendMail({
    from: `"CTF Challenge Master" <${process.env.SMTP_USER}>`,
    to:   'b_bouabca@estin.dz',
    subject: '🚀 ESTIN Talent CTF EXPLOSION – Crash the Site & Snag a Legendary Gaming Mouse! 🎮',
    text:    'ESTIN Talent CTF Challenge: Prove your hacking skills by finding vulnerabilities in our site. First to crash it wins a gaming mouse!',
    html:    inlineHtml,
    headers: {
      'X-Priority': '1',
    },
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, 'logo.png'),
        cid:  'logo@estin',
        contentDisposition: 'inline'
      },
      {
        filename: 'mouse.png',
        path: path.join(__dirname, 'mouse.png'),
        cid:  'mouse@estin',
        contentDisposition: 'inline'
      }
    ]
  });

  console.log('✅ Invitation sent:', info.messageId);
}

sendCTFInvitation().catch(console.error);
