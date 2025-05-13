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
  const htmlPath = path.join(__dirname, 'atack.html');
  let html = await fs.readFile(htmlPath, 'utf8');

  // 2) Inline CSS
  const inlineHtml = juice(html, {
    removeStyleTags: false  // Keep your <style> with @keyframes intact
  });
  
  // 3) Send mail to two recipients
  const info = await transporter.sendMail({
    from: `"CTF Challenge Master" <${process.env.SMTP_USER}>`,
    to:   [
      'b_bouabca@estin.dz',
      'a_zalla@estin.dz'
    ],
    subject: 'Estin talents Ctf is here ',
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
        filename: 'wallimage.png',
        path: path.join(__dirname, 'wallimage.png'),
        cid:  'wallimage@estin',
        contentDisposition: 'inline'
      },
      {
        filename: 'brick.jpg',
        path: path.join(__dirname, 'brick.png'),
        cid:  'brick@estin',
        contentDisposition: 'inline'
      },

      {
        filename: 'back.png',
        path: path.join(__dirname, 'back.png'),
        cid:  'back@estin',
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

  console.log('✅ Invitations sent:', info.messageId);
}

sendCTFInvitation().catch(console.error);