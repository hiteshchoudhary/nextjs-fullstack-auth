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
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const random = (Math.random() + 1).toString(36).substring(7);
        console.log("Random: " + random)
        const tokenData = {
            random: random,
            email: user.email
        }
        const token =  await jwt.sign(tokenData,  process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}