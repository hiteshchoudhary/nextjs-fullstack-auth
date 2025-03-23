import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const{token} = reqBody
        console.log(token)
      
        const user = await User.findOne({ verifyToken: token ,verifyTokenExpiry: {$gt:Date.now()}});

        if(!user){
            return NextResponse.json({error: "invalid token"},{status: 400})
        }
        
        user.isVerified = true;
        user.verifyToken= undefined
        user.verifyTokenExpiry= undefined
        await user.save()

        return NextResponse.json({message: "email verified successfully", success: true})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status: 500})
    }
}