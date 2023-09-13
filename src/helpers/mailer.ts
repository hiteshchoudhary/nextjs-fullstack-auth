import nodemailer from 'nodemailer';
import ServiceProvider from "@/models/serviceProviderModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, ServiceProviderId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(ServiceProviderId.toString(), 10)

        if (emailType === "VERIFY") {
            await ServiceProvider.findByIdAndUpdate(ServiceProviderId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await ServiceProvider.findByIdAndUpdate(ServiceProviderId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            user: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              ServiceProvider: "3fd364695517df",
              pass: "7383d58fd399cf"
              //TODO: add these credentials to .env file
            }
          });


        const mailOptions = {
            from: 'pretoriusbrett1@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}