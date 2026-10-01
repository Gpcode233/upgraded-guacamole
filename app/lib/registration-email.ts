import "server-only";

import { Resend } from "resend";
import { contact, summitDetails } from "./content";

export type ConfirmationEmail = {
  to: string;
  fullName: string;
  accessCode: string;
  event: { title: string; date: string; location: string };
  grade: string;
};

let client: Resend | undefined;

function resend() {
  if (client) return client;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY must be set. See .env.example.");
  client = new Resend(key);
  return client;
}

export async function sendConfirmationEmail(details: ConfirmationEmail) {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) throw new Error("RESEND_FROM_EMAIL must be set. See .env.example.");

  const { error } = await resend().emails.send({
    from,
    to: details.to,
    replyTo: contact.email,
    subject: `You're registered: ${details.event.title} — ${details.accessCode}`,
    html: renderConfirmationHtml(details),
    text: renderConfirmationText(details),
  });
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
}

// Images and links need an absolute URL, so they only appear once the site is
// deployed and SITE_URL points at it.
function siteUrl() {
  return process.env.SITE_URL?.replace(/\/+$/, "") || null;
}

export function renderConfirmationText({
  fullName,
  accessCode,
  event,
  grade,
}: ConfirmationEmail) {
  const site = siteUrl();
  return [
    `Hi ${firstName(fullName)},`,
    "",
    `You're registered for ${event.title}. We look forward to welcoming you.`,
    "",
    "YOUR ACCESS CODE",
    accessCode,
    "Show this code at the accreditation desk to collect your badge.",
    "",
    `Date:        ${event.date}`,
    `Venue:       ${event.location}`,
    `Attendee:    ${fullName}`,
    `Category:    ${grade}`,
    "",
    "Before you arrive",
    "- Keep this email handy, on your phone or printed.",
    "- Arrive early to allow time for accreditation.",
    site ? `- See the full programme: ${site}/schedule` : null,
    "",
    `Questions? Reply to this email or write to ${contact.email}.`,
    `Phone: ${contact.phones.join(" / ")}`,
    "",
    summitDetails.organizer,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

const font =
  "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";
const mono = "font-family:'SFMono-Regular',Menlo,Consolas,'Courier New',monospace;";

export function renderConfirmationHtml({
  fullName,
  accessCode,
  event,
  grade,
}: ConfirmationEmail) {
  const site = siteUrl();
  const name = escape(fullName);
  const first = escape(firstName(fullName));

  const brand = site
    ? `<img src="${site}/images/ncs_logo.png" width="40" height="40" alt="NCS" style="display:block;border:0;border-radius:50%;" />`
    : "";

  const stripe = ["#a5d014", "#2f8f5b", "#d00000", "#0851b1", "#ffcc00"]
    .map(
      (color) =>
        `<td width="20%" style="background:${color};height:4px;line-height:4px;font-size:0;">&nbsp;</td>`,
    )
    .join("");

  const detail = (label: string, value: string) => `
    <td valign="top" width="50%" style="padding:0 0 18px;">
      <p style="margin:0;${font}font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#6b7c71;">${label}</p>
      <p style="margin:6px 0 0;${font}font-size:15px;line-height:22px;font-weight:600;color:#0b1a12;">${escape(value)}</p>
    </td>`;

  const tip = (text: string) => `
    <tr>
      <td valign="top" width="28" style="padding:0 0 12px;">
        <div style="width:18px;height:18px;border-radius:50%;background:#a5d014;text-align:center;${font}font-size:11px;line-height:18px;font-weight:700;color:#10241a;">&#10003;</div>
      </td>
      <td valign="top" style="padding:0 0 12px;${font}font-size:14px;line-height:20px;color:#33443a;">${text}</td>
    </tr>`;

  const programme = site
    ? `
          <tr>
            <td class="px" align="center" style="padding:8px 40px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:10px;background:#005417;">
                    <a href="${site}/schedule" style="display:inline-block;padding:14px 28px;${font}font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">View the programme &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light" />
  <style>
    @media only screen and (max-width:480px) {
      .px { padding-left:24px !important; padding-right:24px !important; }
      .code { font-size:24px !important; letter-spacing:2px !important; }
    }
  </style>
  <title>You're registered — ${escape(event.title)}</title>
</head>
<body style="margin:0;padding:0;background:#e9eee9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#e9eee9;">
    Your access code for ${escape(event.title)} is ${accessCode}. Show it at the accreditation desk.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9eee9;">
    <tr>
      <td align="center" style="padding:32px 12px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Masthead -->
          <tr>
            <td style="padding:0 4px 18px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  ${brand ? `<td style="padding-right:12px;">${brand}</td>` : ""}
                  <td>
                    <p style="margin:0;${font}font-size:13px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:#10241a;">Nigeria Computer Society</p>
                    <p style="margin:2px 0 0;${font}font-size:10px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:#6b7c71;">SouthEast Zone</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 1px 3px rgba(16,36,26,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${stripe}</tr></table>
                  </td>
                </tr>

                <!-- Hero -->
                <tr>
                  <td class="px" style="background:#005417;background-image:linear-gradient(135deg,#00661c 0%,#004212 100%);padding:40px 40px 36px;">
                    <p style="margin:0;${font}font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a5d014;">&#10003;&nbsp; Registration confirmed</p>
                    <h1 style="margin:14px 0 0;${font}font-size:28px;line-height:34px;font-weight:800;letter-spacing:-0.3px;color:#ffffff;">${escape(event.title)}</h1>
                    <p style="margin:12px 0 0;${font}font-size:14px;line-height:21px;color:#cfe3d5;">${escape(event.date)} &nbsp;&middot;&nbsp; ${escape(event.location)}</p>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td class="px" style="padding:36px 40px 8px;">
                    <p style="margin:0;${font}font-size:17px;line-height:26px;font-weight:600;color:#0b1a12;">Hi ${first},</p>
                    <p style="margin:10px 0 0;${font}font-size:15px;line-height:24px;color:#33443a;">Your place is confirmed and we look forward to welcoming you. Below is your personal access code &mdash; you'll need it to collect your badge on arrival.</p>
                  </td>
                </tr>

                <!-- Ticket -->
                <tr>
                  <td class="px" style="padding:24px 40px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#10241a;border-radius:14px;">
                      <tr>
                        <td style="padding:26px 28px 22px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <p style="margin:0;${font}font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8fb89d;">Access code</p>
                              </td>
                              <td align="right">
                                <p style="margin:0;${font}font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a5d014;">Admit one</p>
                              </td>
                            </tr>
                          </table>
                          <p class="code" style="margin:14px 0 0;white-space:nowrap;${mono}font-size:32px;line-height:40px;font-weight:700;letter-spacing:4px;color:#a5d014;">${accessCode}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 28px;">
                          <div style="border-top:2px dashed #2d4a39;height:0;line-height:0;font-size:0;">&nbsp;</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:18px 28px 24px;">
                          <p style="margin:0;${font}font-size:15px;font-weight:700;color:#ffffff;">${name}</p>
                          <p style="margin:4px 0 0;${font}font-size:13px;color:#8fb89d;">${escape(grade)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Details -->
                <tr>
                  <td class="px" style="padding:28px 40px 10px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e3e9e5;padding-top:24px;">
                      <tr>${detail("Date", event.date)}${detail("Venue", event.location)}</tr>
                      <tr>${detail("Attendee", fullName)}${detail("Attendance category", grade)}</tr>
                    </table>
                  </td>
                </tr>

                <!-- Before you arrive -->
                <tr>
                  <td class="px" style="padding:0 40px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6f4;border-radius:12px;">
                      <tr>
                        <td style="padding:22px 24px 12px;">
                          <p style="margin:0 0 14px;${font}font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#005417;">Before you arrive</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            ${tip("Keep this email handy &mdash; on your phone or printed.")}
                            ${tip("Arrive early to allow time for accreditation.")}
                            ${event.title === summitDetails.event ? tip(`Theme: <strong style="color:#0b1a12;">${escape(summitDetails.theme)}</strong>`) : ""}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
${programme}
                <!-- Help -->
                <tr>
                  <td class="px" style="padding:${site ? "0" : "8px"} 40px 36px;">
                    <p style="margin:0;${font}font-size:14px;line-height:22px;color:#33443a;">Questions? Just reply to this email, or reach us at <a href="mailto:${contact.email}" style="color:#005417;font-weight:600;text-decoration:none;">${contact.email}</a> &middot; ${escape(contact.phones[0])}.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 24px 0;">
              <p style="margin:0;${font}font-size:12px;line-height:19px;color:#6b7c71;">${escape(summitDetails.organizer)}</p>
              <p style="margin:4px 0 0;${font}font-size:12px;line-height:19px;color:#8a998f;">${escape(summitDetails.tagline)}</p>
              <p style="margin:12px 0 0;${font}font-size:11px;line-height:17px;color:#9aa89f;">You're receiving this because you registered for ${escape(event.title)}${site ? ` at <a href="${site}" style="color:#6b7c71;">${site.replace(/^https?:\/\//, "")}</a>` : ""}.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0];
}

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
