import transporter from "../config/mail";
import { IContact } from "../types/contact";

class EmailService {
  /**
   * Send enquiry notification to Admin
   */
  async sendAdminEmail(data: IContact) {
    await transporter.sendMail({
      from: `"Ace Soft Solution" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New Website Enquiry - ${data.name}`,
      html: this.getAdminTemplate(data),
    });
  }

  /**
   * Send Thank You Email to Customer
   */
  async sendCustomerEmail(data: IContact) {
    await transporter.sendMail({
      from: `"Ace Soft Solution" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Thank You for Contacting Ace Soft Solution",
      html: this.getCustomerTemplate(data),
    });
  }

  /**
   * Admin HTML Template
   */
  private getAdminTemplate(data: IContact): string {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body{
font-family:Arial,Helvetica,sans-serif;
background:#f5f5f5;
padding:40px;
}

.container{
max-width:650px;
margin:auto;
background:#ffffff;
border-radius:10px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.header{
background:#0f172a;
color:#fff;
padding:30px;
text-align:center;
}

.content{
padding:30px;
}

table{
width:100%;
border-collapse:collapse;
}

td{
padding:12px;
border-bottom:1px solid #eee;
vertical-align:top;
}

.label{
font-weight:bold;
width:180px;
color:#111827;
}

.footer{
padding:20px;
background:#f8fafc;
text-align:center;
font-size:13px;
color:#64748b;
}
</style>
</head>

<body>

<div class="container">

<div class="header">

<h2>🚀 New Website Enquiry</h2>

</div>

<div class="content">

<table>

<tr>
<td class="label">Name</td>
<td>${data.name}</td>
</tr>

<tr>
<td class="label">Email</td>
<td>${data.email}</td>
</tr>

<tr>
<td class="label">Phone</td>
<td>${data.phone}</td>
</tr>

<tr>
<td class="label">Company</td>
<td>${data.company}</td>
</tr>

<tr>
<td class="label">Need NDA</td>
<td>${data.needsNDA}</td>
</tr>

<tr>
<td class="label">Marketing Consent</td>
<td>${data.marketingConsent ? "Yes" : "No"}</td>
</tr>

<tr>
<td class="label">Project Brief</td>
<td>${data.message}</td>
</tr>

</table>

</div>

<div class="footer">

Ace Soft Solution Contact Form

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
    return `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<style>

body{

font-family:Arial;

background:#f5f5f5;

padding:40px;

}

.container{

max-width:650px;

margin:auto;

background:white;

border-radius:12px;

overflow:hidden;

box-shadow:0 10px 30px rgba(0,0,0,.08);

}

.header{

background:#12C7B5;

padding:40px;

text-align:center;

color:white;

}

.content{

padding:40px;

line-height:1.8;

font-size:16px;

color:#334155;

}

.button{

display:inline-block;

padding:14px 28px;

background:#12C7B5;

color:white!important;

text-decoration:none;

border-radius:8px;

font-weight:bold;

margin-top:25px;

}

.footer{

padding:20px;

text-align:center;

font-size:13px;

color:#64748b;

background:#f8fafc;

}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>Thank You ❤️</h1>

</div>

<div class="content">

<p>Hello <strong>${data.name}</strong>,</p>

<p>

Thank you for contacting
<strong>Ace Soft Solution</strong>.

</p>

<p>

We have successfully received your enquiry.

</p>

<p>

Our experts are reviewing your project requirements.

</p>

<p>

One of our consultants will contact you within
<strong>24 business hours.</strong>

</p>

<a
href="https://acesoftsolution.com"
class="button">

Visit Website

</a>

</div>

<div class="footer">

© ${new Date().getFullYear()}
Ace Soft Solution

</div>

</div>

</body>

</html>
`;
  }
}

export default new EmailService();