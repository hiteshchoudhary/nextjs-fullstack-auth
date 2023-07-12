
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
connect();
export async function POST(request: NextRequest){
    const {email} = await request.json();

    try {

        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        } 
        
        await sendEmail({email, emailType: "RESET", userId: user._id.toString()});

        return NextResponse.json({message: "Reset password link send to your email"})

    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
    
}