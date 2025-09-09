"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        if (!user.username || !user.email || !user.password) {
            toast.error("All fields are required");
            return;
        }

        if (user.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)            
            console.log("Signup success", response.data);
            toast.success(response.data.message || "Signup successful!");
            toast.success("Check your email for verification mail");
            router.push("/login")
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
            <div className="border-1 border-white p-8 flex flex-col items-center gap-5 rounded-lg shadow-lg bg-gray-950 w-full max-w-md">
                <h1 className="text-3xl font-semibold">{loading ? "Processing..." : "Signup"}</h1>
                <hr className="w-full border-gray-300" />

                <div className="flex flex-row w-full gap-1 items-center">
                    <label htmlFor="username" className="text-sm font-medium text-gray-200 w-32">
                        Username
                    </label>
                    <input
                        className="p-3 border border-gray-600 rounded-md bg-gray-800 placeholder:text-gray-500 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Enter your username"
                    />
                </div>

                <div className="flex flex-row w-full gap-1 items-center">
                    <label htmlFor="email" className="text-sm font-medium text-gray-200 w-32">
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
                    <label htmlFor="password" className="text-sm font-medium text-gray-200 w-32">
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
                    onClick={onSignup}
                    className={`
                        className="text-white font-semibold hover:cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
                    `}
                    disabled={buttonDisabled}
                    >Sign Up</button>
                <Link href="/login">Visit login page</Link>
            </div>
        </div>
    )
}