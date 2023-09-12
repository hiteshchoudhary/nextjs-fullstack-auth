import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import ServiceProvider from "@/models/serviceProviderModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const serviceProvider = await ServiceProvider.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "serviceProvider found",
            data: serviceProvider
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}