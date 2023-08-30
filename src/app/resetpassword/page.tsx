"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    
    const resetPassword = async () => {
        try {
            await axios.post('/api/users/resetpassword', {token}) 
            setReset(true); 
            router.push("/createnewpass");
        } catch (error:any) {
            setError(true);
            console.log(error.message);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log("urlToken: " + urlToken)
        setToken(urlToken || ""); 
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            resetPassword();
        }
    }, [token]);
}