import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Application Submitted Email
export const sendApplicationSubmittedEmail = async (userEmail, userName, bankName, loanAmount) => {
  try {
    await transporter.sendMail({
      from: `"Score2Loan" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "✅ Loan Application Submitted — Score2Loan",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a2818; padding: 30px; text-align: center; border-bottom: 3px solid #d4920a;">
            <h1 style="color: #f5c842; margin: 0; font-size: 24px;">Score2Loan</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 4px 0 0; letter-spacing: 2px;">LOAN ELIGIBILITY PLATFORM</p>
          </div>
          <div style="padding: 32px; background: #f8faf9;">
            <h2 style="color: #0a2818; margin-bottom: 8px;">Application Submitted! 🎉</h2>
            <p style="color: #6b7280; font-size: 14px;">Dear <strong>${userName}</strong>,</p>
            <p style="color: #6b7280; font-size: 14px;">Your loan application has been successfully submitted. Here are your details:</p>
            <div style="background: white; border: 2px solid #d4920a; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Bank</td>
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #0a2818; text-align: right;">${bankName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Loan Amount</td>
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #0a2818; text-align: right;">₹${Number(loanAmount).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Status</td>
                  <td style="padding: 10px 0; text-align: right;">
                    <span style="background: #fef8e0; color: #b86e00; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">⏳ Pending Review</span>
                  </td>
                </tr>
              </table>
            </div>
            <p style="color: #6b7280; font-size: 13px;">Our team will review your application within 2-3 business days. You will receive an email once a decision is made.</p>
            <div style="text-align: center; margin-top: 24px;">
              <a href="${process.env.CLIENT_URL}/applications" 
                style="background: #0a2818; color: #f5c842; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                Track Application →
              </a>
            </div>
          </div>
          <div style="background: #0a2818; padding: 16px; text-align: center;">
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Score2Loan. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    console.log(`✅ Submission email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
  }
};

// ✅ Application Approved Email
export const sendApplicationApprovedEmail = async (userEmail, userName, bankName, loanAmount) => {
  try {
    await transporter.sendMail({
      from: `"Score2Loan" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🎉 Loan Approved! — Score2Loan",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a2818; padding: 30px; text-align: center; border-bottom: 3px solid #d4920a;">
            <h1 style="color: #f5c842; margin: 0; font-size: 24px;">Score2Loan</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 4px 0 0; letter-spacing: 2px;">LOAN ELIGIBILITY PLATFORM</p>
          </div>
          <div style="padding: 32px; background: #f8faf9;">
            <div style="text-align: center; margin-bottom: 24px;">
              <div style="font-size: 48px;">🎉</div>
              <h2 style="color: #1a7a3f; margin: 8px 0;">Congratulations! Loan Approved!</h2>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Dear <strong>${userName}</strong>,</p>
            <p style="color: #6b7280; font-size: 14px;">Great news! Your loan application has been <strong style="color: #1a7a3f;">approved</strong>!</p>
            <div style="background: white; border: 2px solid #d4920a; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Bank</td>
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #0a2818; text-align: right;">${bankName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Loan Amount</td>
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #0a2818; text-align: right;">₹${Number(loanAmount).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Status</td>
                  <td style="padding: 10px 0; text-align: right;">
                    <span style="background: #d4f5e0; color: #1a7a3f; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">✅ Approved</span>
                  </td>
                </tr>
              </table>
            </div>
            <div style="background: #d4f5e0; border-radius: 8px; padding: 14px; margin: 16px 0;">
              <p style="color: #1a7a3f; font-size: 13px; margin: 0;">
                🏦 The bank will contact you within 2-3 business days to complete the loan process. Please keep your documents ready.
              </p>
            </div>
            <div style="text-align: center; margin-top: 24px;">
              <a href="${process.env.CLIENT_URL}/applications"
                style="background: #1a7a3f; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                View Application →
              </a>
            </div>
          </div>
          <div style="background: #0a2818; padding: 16px; text-align: center;">
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Score2Loan. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    console.log(`✅ Approval email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
  }
};

// ✅ Application Rejected Email
export const sendApplicationRejectedEmail = async (userEmail, userName, bankName, loanAmount, rejectionReason) => {
  try {
    await transporter.sendMail({
      from: `"Score2Loan" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "❌ Loan Application Update — Score2Loan",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a2818; padding: 30px; text-align: center; border-bottom: 3px solid #d4920a;">
            <h1 style="color: #f5c842; margin: 0; font-size: 24px;">Score2Loan</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 4px 0 0; letter-spacing: 2px;">LOAN ELIGIBILITY PLATFORM</p>
          </div>
          <div style="padding: 32px; background: #f8faf9;">
            <h2 style="color: #c0392b; margin-bottom: 8px;">Application Update</h2>
            <p style="color: #6b7280; font-size: 14px;">Dear <strong>${userName}</strong>,</p>
            <p style="color: #6b7280; font-size: 14px;">We regret to inform you that your loan application has been <strong style="color: #c0392b;">rejected</strong>.</p>
            <div style="background: white; border: 2px solid #d4920a; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Bank</td>
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #0a2818; text-align: right;">${bankName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Loan Amount</td>
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #0a2818; text-align: right;">₹${Number(loanAmount).toLocaleString("en-IN")}</td>
                </tr>
                <tr style="border-bottom: 1px solid #fef3c7;">
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Status</td>
                  <td style="padding: 10px 0; text-align: right;">
                    <span style="background: #fdecea; color: #c0392b; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">❌ Rejected</span>
                  </td>
                </tr>
                ${rejectionReason ? `
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #6b7280;">Reason</td>
                  <td style="padding: 10px 0; font-size: 13px; color: #c0392b; text-align: right;">${rejectionReason}</td>
                </tr>` : ""}
              </table>
            </div>
            <div style="background: #fef8e0; border-radius: 8px; padding: 14px; margin: 16px 0;">
              <p style="color: #b86e00; font-size: 13px; margin: 0; font-weight: 600; margin-bottom: 6px;">💡 What you can do:</p>
              <ul style="color: #92400e; font-size: 13px; margin: 0; padding-left: 16px; line-height: 1.8;">
                <li>Improve your credit score</li>
                <li>Reduce existing EMIs</li>
                <li>Try a lower loan amount</li>
                <li>Apply to other banks on Score2Loan</li>
              </ul>
            </div>
            <div style="text-align: center; margin-top: 24px;">
              <a href="${process.env.CLIENT_URL}/eligibility"
                style="background: #0a2818; color: #f5c842; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                Try Other Banks →
              </a>
            </div>
          </div>
          <div style="background: #0a2818; padding: 16px; text-align: center;">
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Score2Loan. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    console.log(`✅ Rejection email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
  }
};