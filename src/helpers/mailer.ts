import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedValue = await bcrypt.hash(userId.toString(), 10);
    
    const encodedToken = encodeURIComponent(hashedValue);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedValue, // Save raw hash in DB
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedValue, // Save raw hash in DB
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
       host: process.env.EMAIL_HOST,
       port: Number(process.env.EMAIL_PORT),
       auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
       },
    });

    const resetPath = "/resetpassword"; 

    const mailOptions = {
        from: "Auth NextJS <no-reply@authnextjs.com>",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `
            <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
            <a href="${process.env.DOMAIN}${emailType === "VERIFY" ? "/verify-email" : resetPath}?token=${encodedToken}&id=${userId}">
                Click here
            </a>
            <p>This link will expire in 1 hour.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};