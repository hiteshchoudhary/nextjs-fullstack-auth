import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("token @app/api/users/verifyemail/route.ts: "+token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log("user @app/api/users/verifyemail/route.ts: " + user)
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    
    }
}