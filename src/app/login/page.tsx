"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Logged in successfully!", response.data)
            toast.success("Logged in successfully!")
            router.push("/profile")
        } catch (error: any) {
            let errorMessage = error.response?.data?.error || error.message;
            console.log("Login failed", errorMessage)
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
            <div className="border-1 border-white p-8 flex flex-col items-center gap-5 rounded-lg shadow-lg bg-gray-950 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-white">{loading ? "Logging in..." : "Login"}</h1>
                <hr className="w-full border-gray-300" />

                <div className="flex flex-row w-full gap-1 items-center">
                    <label htmlFor="email" className="text-sm font-medium text-white w-32">
                        Email
                    </label>
                    <input
                        className="p-3 border border-gray-600 rounded-md bg-gray-800 placeholder:text-gray-500 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="flex flex-row w-full gap-1 items-center">
                    <label htmlFor="password" className="text-sm font-medium text-white w-32">
                        Password
                    </label>
                    <input
                        className="p-3 border border-gray-600 rounded-md bg-gray-800 placeholder:text-gray-500 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Enter your password"
                    />
                </div>

                <button
                onClick={onLogin}
                className="text-white font-semibold hover:cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
                >
                Login
                </button>

                <div className="flex flex-row justify-between w-full mt-4">
                    <Link 
                        href="/signup" 
                        className="text-sm text-white hover:text-blue-400 hover:underline transition-colors duration-200"
                    >
                        Don't have an account? Sign up
                    </Link>
                    <Link 
                        href="/forgot-password" 
                        className="text-sm text-white hover:text-blue-400 hover:underline transition-colors duration-200"
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    )
}