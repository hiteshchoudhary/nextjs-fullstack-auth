"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [user, setUser] = useState({
        email: "" 
    })
    const [loading, setLoading] = React.useState(false);
    const onForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", user); 
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Forgot password</h1>
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <button
                onClick={onForgotPassword}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Send mail
            </button>
        </div>
    )
}