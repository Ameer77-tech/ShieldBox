import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendCode = async (to, code) => {
  const mailOptions = {
    from: `"ShieldBox" <${process.env.EMAIL}>`,
    to,
    subject: "Notification from ShieldBox",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f6fb; padding: 32px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
          <h2 style="color: #2d3748; text-align: center;">ShieldBox Verification</h2>
          <p style="font-size: 16px; color: #4a5568; text-align: center;">
            Thank you for registering with <b>ShieldBox</b>.<br>
            Please use the verification code below to continue:
          </p>
          <div style="margin: 24px 0; text-align: center;">
            <span style="display: inline-block; font-size: 32px; letter-spacing: 8px; color: #2563eb; background: #f1f5fb; padding: 16px 32px; border-radius: 8px; font-weight: bold;">
              ${code}
            </span>
          </div>
          <p style="font-size: 14px; color: #718096; text-align: center;">
            This code will expire in 10 minutes.<br>
            If you did not request this, please ignore this email.
          </p>
          <hr style="margin: 32px 0;">
          <p style="font-size: 12px; color: #a0aec0; text-align: center;">
            &copy; ${new Date().getFullYear()} ShieldBox. All rights reserved.
          </p>
        </div>
      </div>
    `, // message body as HTML
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};
