import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModels";

export const sendEmail = async({ email, emailtype, userId }: any) => {

    try{
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);

      if (emailtype == "VERIFY") {
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailtype == "RESET") {
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
      }

      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });


      const mailoptions = {
        from: "ashna@gmail.com",
        to: email,
        subject:
          emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/${
          emailtype === "VERIFY" ? "verifyemail" : "resetpassword"
        }?token=${hashedToken}">here</a> to ${
          emailtype === "VERIFY" ? "verify your email" : "reset your password"
        }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
          emailtype === "VERIFY" ? "verifyemail" : "resetpassword"
        }?token=${hashedToken}
      </p>`,
      };

      const response = await transport.sendMail(mailoptions)
      return response;

    }catch(error:any){
 throw new Error(error.message)
    }
    
};