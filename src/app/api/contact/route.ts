import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

interface ContactFormPayload {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface MailConfigSuccess {
  ok: true
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  to: string
  from: string
}

interface MailConfigError {
  ok: false
  error: string
  status: number
}

type MailConfigResult = MailConfigSuccess | MailConfigError

async function parseContactRequest(req: Request): Promise<ContactFormPayload> {
  const data = await req.json()

  return {
    name: (data?.name ?? "").toString().trim(),
    email: (data?.email ?? "").toString().trim(),
    phone: (data?.phone ?? "").toString().trim(),
    subject: (data?.subject ?? "").toString().trim(),
    message: (data?.message ?? "").toString().trim(),
  }
}

function validateContactPayload(payload: ContactFormPayload): string | null {
  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return "Missing required fields."
  }
  return null
}

function getMailConfig(): MailConfigResult {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = process.env.SMTP_SECURE === "true" || port === 465

  if (!host || !user || !pass) {
    return {
      ok: false,
      error: "Email service not configured.",
      status: 500,
    }
  }

  const to = process.env.CONTACT_TO_EMAIL || "info@arkinstitutebc.com"
  const from = process.env.SMTP_FROM || user

  return {
    ok: true,
    host,
    port,
    secure,
    user,
    pass,
    to,
    from,
  }
}

async function sendContactEmail(
  payload: ContactFormPayload,
  config: MailConfigSuccess
) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })

  const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 8px">New contact form submission</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p style="margin:0 0 4px"><strong>Phone:</strong> ${escapeHtml(payload.phone || "—")}</p>
        <p style="margin:12px 0 6px"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <p style="white-space:pre-wrap; margin:0">${escapeHtml(payload.message)}</p>
      </div>
    `

  const text = `New contact form submission\n\nName: ${
    payload.name
  }\nEmail: ${payload.email}\nPhone: ${
    payload.phone || "—"
  }\nSubject: ${payload.subject}\n\n${payload.message}`

  await transporter.sendMail({
    to: config.to,
    from: config.from,
    replyTo: payload.email,
    subject: `[Ark Institute] ${payload.subject}`,
    text,
    html,
  })
}

export async function POST(req: Request) {
  try {
    const payload = await parseContactRequest(req)

    const validationError = validateContactPayload(payload)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const mailConfig = getMailConfig()
    if (!mailConfig.ok) {
      return NextResponse.json(
        { error: mailConfig.error },
        { status: mailConfig.status }
      )
    }

    await sendContactEmail(payload, mailConfig)

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error("Contact form error:", err)
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    )
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
