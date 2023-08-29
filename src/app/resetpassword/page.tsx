"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    
    const resetPassword = async () => {

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || ""); 
    }, []);
}