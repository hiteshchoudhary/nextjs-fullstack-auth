import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json() 
        const {email} = reqBody
        const user = await User.findOne({email})
        
        const random = (Math.random() + 1).toString(36).substring(7);
        console.log("Random: " + random)
        console.log("user._id: " + user._id)
        console.log("user.email: " + user.email)

        const tokenData = {
            random: random,
            email: user.email
        }
        await sendEmail({email, emailType: "RESET", userId: user._id})
        return NextResponse.json({
            message: "token of forgotten password created successfully",
            success: true
        })
    } catch (error: any) {
        console.log(error.message)
        console.log("Error at src/app/api/users/forgotpassword/route.ts")
        return NextResponse.json({error: error.message}, {status: 500})
    }
}