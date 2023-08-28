import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json() 
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}