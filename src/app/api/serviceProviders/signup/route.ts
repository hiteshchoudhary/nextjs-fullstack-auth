'use client'
import {connect} from "@/dbConfig/dbConfig";
import ServiceProvider from "@/models/serviceProviderModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, phone, password, services} = reqBody

        console.log(reqBody);

        //check if serviceProvider already exists
        const serviceProvider = await ServiceProvider.findOne({email})

        if(serviceProvider){
            return NextResponse.json({error: "ServiceProvider already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newServiceProvider = new ServiceProvider({
            email,
            phone,
            password: hashedPassword,
            services: []
        })

        const savedServiceProvider = await newServiceProvider.save()
        console.log(savedServiceProvider);

        //send verification email

        await sendEmail({email, emailType: "VERIFY", serviceProviderId: savedServiceProvider._id})

        return NextResponse.json({
            message: "ServiceProvider created successfully",
            success: true,
            savedServiceProvider
        })
        
     } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}