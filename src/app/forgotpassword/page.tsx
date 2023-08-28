"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [user, setUser] = useState({
        email: "" 
    })
    const onForgotPassword = async () => {}
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Forgot password</h1>
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
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