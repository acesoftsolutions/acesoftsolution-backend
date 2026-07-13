import { Resend } from "resend";
import { IContact } from "../types/contact";

const resend = new Resend(process.env.RESEND_API_KEY!);

class EmailService {
  /**
   * Send enquiry notification to Admin
   */
  async sendAdminEmail(data: IContact) {
    await resend.emails.send({
      from: `Ace Soft Solution <${process.env.FROM_EMAIL}>`,
      to: [process.env.ADMIN_EMAIL!],
      subject: `🚀 New Website Enquiry - ${data.name}`,
      html: this.getAdminTemplate(data),
    });
  }

  /**
   * Send Thank You Email to Customer
   */
  async sendCustomerEmail(data: IContact) {
    await resend.emails.send({
      from: `Ace Soft Solution <${process.env.FROM_EMAIL}>`,
      to: [data.email],
      subject: "Thank You for Contacting Ace Soft Solution",
      html: this.getCustomerTemplate(data),
    });
  }

  /**
   * Admin HTML Template
   */
  /**
   * Premium Admin HTML Template
   */
  private getAdminTemplate(data: IContact): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Website Enquiry</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', Arial, Helvetica, sans-serif;
            background: #f8fafc;
            padding: 40px 20px;
            margin: 0;
            color: #1e2937;
        }

        .container {
            max-width: 680px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
        }

        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }

        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: rgba(255,255,255,0.3);
        }

        .header h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }

        .content {
            padding: 40px 35px;
        }

        .info-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 28px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        tr {
            border-bottom: 1px solid #e2e8f0;
        }

        tr:last-child {
            border-bottom: none;
        }

        td {
            padding: 16px 0;
            vertical-align: top;
        }

        .label {
            font-weight: 600;
            color: #64748b;
            width: 180px;
            padding-right: 20px;
        }

        .value {
            font-weight: 500;
            color: #1e2937;
            line-height: 1.5;
        }

        .highlight {
            background: #eff6ff;
            color: #1e40af;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 14px;
        }

        .message-box {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 20px;
            margin-top: 8px;
            white-space: pre-wrap;
            font-size: 15.5px;
            line-height: 1.6;
        }

        .footer {
            background: #0f172a;
            color: #94a3b8;
            text-align: center;
            padding: 28px 30px;
            font-size: 13px;
        }

        .footer strong {
            color: #cbd5e1;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
        }
    </style>
</head>
<body>

<div class="container">

    <!-- Header -->
    <div class="header">
        <h2>🚀 New Website Enquiry</h2>
        <p>A potential client just submitted a contact form</p>
    </div>

    <!-- Content -->
    <div class="content">

        <div class="info-card">
            <table>
                <tr>
                    <td class="label">Name</td>
                    <td class="value">${data.name}</td>
                </tr>
                <tr>
                    <td class="label">Email</td>
                    <td class="value">
                        <a href="mailto:${data.email}" style="color:#3b82f6; text-decoration:none;">${data.email}</a>
                    </td>
                </tr>
                <tr>
                    <td class="label">Phone</td>
                    <td class="value">${data.phone || "—"}</td>
                </tr>
                <tr>
                    <td class="label">Company</td>
                    <td class="value">${data.company || "—"}</td>
                </tr>
                <tr>
                    <td class="label">Needs NDA</td>
                    <td class="value">
                        ${
                          data.needsNDA
                            ? '<span class="badge" style="background:#fef3c7;color:#854d0e;">Yes – NDA Required</span>'
                            : '<span class="badge" style="background:#e0f2fe;color:#0e7490;">No</span>'
                        }
                    </td>
                </tr>
                <tr>
                    <td class="label">Marketing Consent</td>
                    <td class="value">
                        ${
                          data.marketingConsent
                            ? '<span class="highlight">✅ Yes</span>'
                            : '<span style="color:#64748b;">No</span>'
                        }
                    </td>
                </tr>
            </table>
        </div>

        <!-- Project Brief -->
        <h3 style="margin:0 0 12px 0; color:#1e2937; font-size:18px;">Project Brief</h3>
        <div class="message-box">
            ${data.message ? data.message.replace(/\n/g, "<br>") : "No message provided."}
        </div>

    </div>

    <!-- Footer -->
    <div class="footer">
        <strong>Ace Soft Solution</strong><br>
        Contact Form • ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
    </div>

</div>

</body>
</html>
`;
  }

  /**
   * Customer HTML Template
   */
  /**
   * Premium Customer Thank You Template
   */
  private getCustomerTemplate(data: IContact): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Ace Soft Solution</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', Arial, Helvetica, sans-serif;
            background: #f8fafc;
            padding: 40px 20px;
            margin: 0;
            color: #1e2937;
            line-height: 1.7;
        }

        .container {
            max-width: 680px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
        }

        .header {
            background: linear-gradient(135deg, #12C7B5 0%, #0ea88f 100%);
            color: white;
            padding: 50px 30px;
            text-align: center;
            position: relative;
        }

        .header h1 {
            margin: 0;
            font-size: 42px;
            font-weight: 700;
            letter-spacing: -1px;
        }

        .header .subtitle {
            font-size: 18px;
            margin: 12px 0 0 0;
            opacity: 0.95;
        }

        .content {
            padding: 45px 40px;
            font-size: 16.5px;
            color: #334155;
        }

        .content p {
            margin: 18px 0;
        }

        .highlight {
            color: #12C7B5;
            font-weight: 600;
        }

        .button {
            display: inline-block;
            padding: 16px 32px;
            background: #12C7B5;
            color: white !important;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 16px;
            margin: 25px 0 10px 0;
            box-shadow: 0 8px 20px rgba(18, 199, 181, 0.3);
            transition: all 0.3s ease;
        }

        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(18, 199, 181, 0.4);
        }

        .footer {
            background: #0f172a;
            color: #94a3b8;
            text-align: center;
            padding: 32px 30px;
            font-size: 14px;
        }

        .footer strong {
            color: #e2e8f0;
        }
    </style>
</head>
<body>

<div class="container">

    <!-- Header -->
    <div class="header">
        <h1>Thank You ❤️</h1>
        <p class="subtitle">We’ve received your enquiry</p>
    </div>

    <!-- Content -->
    <div class="content">
        <p>Hello <strong>${data.name}</strong>,</p>
        
        <p>
            Thank you for reaching out to <strong>Ace Soft Solution</strong>. 
            We truly appreciate your interest in working with us.
        </p>
        
        <p>
            Our team has successfully received your project details and is currently reviewing them.
        </p>
        
        <p>
            One of our expert consultants will get in touch with you within 
            <strong class="highlight">24 business hours</strong>.
        </p>
        
        <p>
            In the meantime, feel free to explore our recent work and services.
        </p>

        <center>
            <a href="https://acesoftsolution.com" class="button" target="_blank">
                Visit Our Website
            </a>
        </center>

        <p style="margin-top: 35px; font-size: 15px; color: #64748b;">
            If you have any urgent questions, you can reply directly to this email.
        </p>
    </div>

    <!-- Footer -->
    <div class="footer">
        <strong>Ace Soft Solution</strong><br>
        Professional Web & Software Solutions<br>
        © ${new Date().getFullYear()} All Rights Reserved
    </div>

</div>

</body>
</html>
`;
  }
}

export default new EmailService();
