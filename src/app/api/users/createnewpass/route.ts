import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json()
        const {password} = reqBody;
        console.log("reqBody.password: " + reqBody.password);

        const email = request.cookies.get("email")?.value || '';
        console.log("Email: " + email)

        // Create a newtoken001 for the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        // Update the password for the email to newtoken001
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does Not exist"}, {status: 400})
        }

        await sendEmail({
            email, emailType: "RESETTED", 
            userId: user._id,
            hashedPassword: hashedPassword !== undefined ? hashedPassword : ""
        })
        const response = NextResponse.json( 
            { 
                message: "Create new pass successful", 
                success: true, 
            } 
        ) 
        response.cookies.set("email", "", { 
            httpOnly: true, expires: new Date(0) 
        });
        response.cookies.set("token", "", { 
            httpOnly: true, expires: new Date(0) 
        });
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}