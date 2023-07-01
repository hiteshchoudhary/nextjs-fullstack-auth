"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            <div className="bg-[#1f1f1f] rounded-lg p-2 py-3 md:px-6 md:py-4 w-full max-w-md  gap-3 flex flex-col shadow backdrop-blur-lg ">
                <h1 className="text-lg text-center">{loading ? "Processing" : "Login"}</h1>
                <div className="border-b-[1px] border-b-slate-700" />
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
                    onClick={onLogin}
                    className="outline-none py-2 md:py-2.5 bg-blue-700 text-white rounded-md mt-8">{buttonDisabled ? "No Login" : "Login"}
                </button>
                <p className="text-center mt-4">
                    Don&apos;t have an account ?
                    <Link href="/signup" className="text-blue-600"> Signup </Link>
                </p>
            </div>
        </div>
    )

}