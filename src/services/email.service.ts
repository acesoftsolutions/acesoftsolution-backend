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
  private getAdminTemplate(data: IContact): string {
    const logoUrl = `${process.env.BASE_URL || "https://acesoftsolution.com"}/images/logo.png`;

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
            line-height: 1.6;
        }

        .container {
            max-width: 680px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(15, 23, 42, 0.1);
            border: 1px solid #e2e8f0;
        }

        .header {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 40px 40px 30px;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
        }

        .logo {
            width: 180px;
            height: auto;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05));
        }

        .header h2 {
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -0.6px;
        }

        .header p {
            margin: 0;
            color: #64748b;
            font-size: 16.5px;
        }

        .content {
            padding: 45px 40px;
        }

        .info-card {
            background: #f8fafc;
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 35px;
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
            padding: 18px 0;
            vertical-align: top;
        }

        .label {
            font-weight: 600;
            color: #64748b;
            width: 160px;
            padding-right: 25px;
        }

        .value {
            font-weight: 500;
            color: #1e2937;
        }

        .badge {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 13.5px;
            font-weight: 600;
        }

        .message-box {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin-top: 10px;
            white-space: pre-wrap;
            font-size: 15.5px;
            line-height: 1.65;
            color: #334155;
        }

        .footer {
            background: #0f172a;
            color: #94a3b8;
            text-align: center;
            padding: 32px 40px;
            font-size: 13.5px;
        }

        .footer strong {
            color: #cbd5e1;
        }

        .highlight {
            color: #2563eb;
            font-weight: 600;
        }
    </style>
</head>
<body>

<div class="container">

    <!-- Header with Logo -->
    <div class="header">
        <img src="${logoUrl}" alt="Ace Soft Solution" class="logo" />
        <h2>New Website Enquiry</h2>
        <p>A potential client just reached out via contact form</p>
    </div>

    <!-- Content -->
    <div class="content">

        <div class="info-card">
            <table>
                <tr>
                    <td class="label">Name</td>
                    <td class="value"><strong>${data.name}</strong></td>
                </tr>
                <tr>
                    <td class="label">Email</td>
                    <td class="value">
                        <a href="mailto:${data.email}" style="color:#2563eb; text-decoration:none;">${data.email}</a>
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
                            : '<span class="badge" style="background:#ecfdf5;color:#10b981;">No</span>'
                        }
                    </td>
                </tr>
                <tr>
                    <td class="label">Marketing Consent</td>
                    <td class="value">
                        ${
                          data.marketingConsent
                            ? '<span class="highlight">✅ Yes, willing to receive updates</span>'
                            : '<span style="color:#64748b;">No</span>'
                        }
                    </td>
                </tr>
            </table>
        </div>

        <!-- Project Brief -->
        <h3 style="margin:0 0 14px 0; color:#1e2937; font-size:19px; font-weight:600;">
            Project Brief
        </h3>
        <div class="message-box">
            ${data.message ? data.message.replace(/\n/g, "<br>") : "No additional message provided."}
        </div>

    </div>

    <!-- Footer -->
    <div class="footer">
        <strong>Ace Soft Solution</strong><br>
        Contact Form Submission • 
        ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
    </div>

</div>

</body>
</html>
`;
  }

  /**
   * Customer HTML Template
   */
  private getCustomerTemplate(data: IContact): string {
    const logoUrl = `${process.env.BASE_URL || "https://acesoftsolution.com"}/images/logo.png`;

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
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(15, 23, 42, 0.1);
            border: 1px solid #e2e8f0;
        }

        .header {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 45px 40px 35px;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
        }

        .logo {
            width: 180px;
            height: auto;
            margin-bottom: 24px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06));
        }

        .header h1 {
            margin: 0 0 8px 0;
            font-size: 38px;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -1.2px;
        }

        .header .subtitle {
            font-size: 18.5px;
            color: #64748b;
            margin: 0;
        }

        .content {
            padding: 45px 40px;
            font-size: 16.5px;
            color: #334155;
        }

        .content p {
            margin: 20px 0;
        }

        .highlight {
            color: #12C7B5;
            font-weight: 600;
        }

        .button {
            display: inline-block;
            padding: 16px 36px;
            background: #12C7B5;
            color: white !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16.5px;
            margin: 25px 0 15px 0;
            box-shadow: 0 8px 20px rgba(18, 199, 181, 0.3);
            transition: all 0.3s ease;
        }

        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(18, 199, 181, 0.4);
        }

        .next-steps {
            background: #f8fafc;
            border-radius: 12px;
            padding: 28px;
            margin: 35px 0;
            border: 1px solid #e2e8f0;
        }

        .footer {
            background: #0f172a;
            color: #94a3b8;
            text-align: center;
            padding: 35px 40px;
            font-size: 14px;
        }

        .footer strong {
            color: #e2e8f0;
        }
    </style>
</head>
<body>

<div class="container">

    <!-- Header with Logo -->
    <div class="header">
        <img src="${logoUrl}" alt="Ace Soft Solution" class="logo" />
        <h1>Thank You ❤️</h1>
        <p class="subtitle">We’ve received your enquiry</p>
    </div>

    <!-- Content -->
    <div class="content">
        <p>Hello <strong>${data.name}</strong>,</p>
        
        <p>
            Thank you for reaching out to <strong>Ace Soft Solution</strong>. 
            We truly appreciate your trust and interest in working with us.
        </p>
        
        <p>
            Our team has successfully received your project details and is reviewing them carefully.
        </p>

        <div class="next-steps">
            <strong>What happens next?</strong><br><br>
            • One of our expert consultants will contact you within <strong class="highlight">24 business hours</strong>.<br>
            • We’ll discuss your requirements in detail and provide a tailored proposal.
        </div>

        <p>
            In the meantime, feel free to explore our recent projects and services.
        </p>

        <center>
            <a href="https://acesoftsolution.com" class="button" target="_blank">
                Visit Our Website
            </a>
        </center>

        <p style="margin-top: 40px; font-size: 15.5px; color: #64748b;">
            If you have any urgent questions, simply reply to this email. We’re here to help!
        </p>
    </div>

    <!-- Footer -->
    <div class="footer">
        <strong>Ace Soft Solution</strong><br>
        Professional Web & Software Development<br>
        © ${new Date().getFullYear()} All Rights Reserved
    </div>

</div>

</body>
</html>
`;
  }
}

export default new EmailService();
