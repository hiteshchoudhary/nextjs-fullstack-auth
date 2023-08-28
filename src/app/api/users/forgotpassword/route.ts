import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

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
        const token =  await jwt.sign(tokenData,  process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        console.log("token: " + token)
        return NextResponse.json({
            message: "token of forgotten password created successfully",
            success: true,
            token
        })
    } catch (error: any) {
        console.log("Error at src/app/api/users/forgotpassword/route.ts")
        return NextResponse.json({error: error.message}, {status: 500})
    }
}