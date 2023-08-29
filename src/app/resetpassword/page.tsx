"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(false);
    
    const resetPassword = async () => {
        try {
            await axios.post('/api/users/resetpassword', {token}) 
            setReset(true); 
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
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