import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    
    }
}