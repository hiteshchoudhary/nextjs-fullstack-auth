import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect()

export async function POST(request: NextRequest){
    let user;
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("token @app/api/users/resetpassword/route.ts: "+token)
        user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        console.log("user @app/api/users/resetpassword/route.ts: " + user)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

    console.log("Here is the end of POST @app/api/users/resetpassword/route.ts")

    const response = NextResponse.json({
        message: "Resetting the password",
        success: true,
    })
    response.cookies.set("email", user.email, {
        httpOnly: true, 
    })
    return response;
}