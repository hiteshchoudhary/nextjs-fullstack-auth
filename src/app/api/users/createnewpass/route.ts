import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        
    } catch (error: any) {
        const reqBody = await request.json() 
        const {email} = reqBody
        console.log("email @ " + email)
    }
}