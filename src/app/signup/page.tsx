"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            <div className="bg-[#1f1f1f] rounded-lg p-2 py-3 md:px-6 md:py-4 w-full max-w-md  gap-3 flex flex-col shadow backdrop-blur-lg ">
                <h1 className="text-lg text-center">{loading ? "Processing" : "Signup"}</h1>
                <div className="border-b-[1px] border-b-slate-700" />
                <label htmlFor="username" className="text-sm">Username</label>
                <input
                    className="pl-4 py-2.5 border bg-transparent rounded-md border-gray-600 outline-none"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                />
                <label htmlFor="email" className="text-sm">Email</label>
                <input
                    className="pl-4 py-2.5 border bg-transparent rounded-md border-gray-600 outline-none"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
                <label htmlFor="password" className="text-sm">Password</label>
                <input
                    className="pl-4 py-2.5 border bg-transparent rounded-md border-gray-600 outline-none"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                <button
                    onClick={onSignup}
                    className="outline-none py-2 md:py-2.5 bg-blue-700 text-white rounded-md mt-8">{buttonDisabled ? "No signup" : "Signup"}
                </button>
                <p className="text-center mt-4">
                    Already have an account ?
                    <Link href="/login" className="text-blue-600"> Login </Link>
                </p>
            </div>
        </div>
    )

}