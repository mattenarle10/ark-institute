import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const name = (data?.name ?? '').toString().trim();
    const email = (data?.email ?? '').toString().trim();
    const phone = (data?.phone ?? '').toString().trim();
    const subject = (data?.subject ?? '').toString().trim();
    const message = (data?.message ?? '').toString().trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    if (!host || !user || !pass) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const to = process.env.CONTACT_TO_EMAIL || 'info@arkinstitutebc.com';
    const from = process.env.SMTP_FROM || user;

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 8px">New contact form submission</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 4px"><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
        <p style="margin:12px 0 6px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p style="white-space:pre-wrap; margin:0">${escapeHtml(message)}</p>
      </div>
    `;

    const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\nSubject: ${subject}\n\n${message}`;

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject: `[Ark Institute] ${subject}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
