import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId, hashedPassword}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            console.log("Token for VERIFY: " + hashedToken)
            await User.findByIdAndUpdate(
                userId, 
                {
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }else if (emailType === "RESET"){
            console.log("Token for RESET: " + hashedToken)
            await User.findByIdAndUpdate(
                userId, 
                {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }else if (emailType === "RESETTED"){
            console.log("Going to update password for the user: " + userId) // 64eb534511882d5cadc8a2fa
            console.log("The new pass is: " + hashedPassword) // $2a$10$w8YcKAqU0HTrmMRiFrYWI.9asXQXy37fOf9puqW7STBFE7oIsC8fa
            const formattedTimestamp = new Date().toLocaleString(); // Converts timestamp to a localized date and time string
            await User.findByIdAndUpdate(
                userId, 
                {
                    password: hashedPassword, 
                    forgotPasswordToken: "Resetted password @" + formattedTimestamp,
                    forgotPasswordTokenExpiry: ""
                }
            )
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "dec2cb5f266394",
              pass: "124851b2db71c9"
            }
        });

        // const mailOptions = {
        //     from: 'mamitianasolofo@gmail.com',
        //     to: email,
        //     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        //     html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail": "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        //     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail": "resetpassword"}?token=${hashedToken}
        //     </p>`
        // }

        let mailOptions = {
            from: 'mamitianasolofo@gmail.com',
            to: email,
        }

        let subject = ""
        let html = ""
        if(emailType === "VERIFY") {
            subject = "Verify your email"
            html = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email `
            html += `or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        }else if (emailType === "RESET") {
            subject = "Resetting your password"
            html = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password `
            html += `or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
        }else if (emailType === "RESETTED") {
            subject = "Your password is resetted"
            html = `<p>Click <a href="${process.env.DOMAIN}/login">here</a> to login with your new password `
            html += `or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/login`
        }
        mailOptions["subject"] = subject
        mailOptions["html"] = html

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}