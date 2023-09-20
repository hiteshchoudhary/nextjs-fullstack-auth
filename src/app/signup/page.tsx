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
    const [error, setError] = React.useState(null);

    const onSignup = async () => {
        try {
            if (!user.email || !user.password || !user.username) {
                throw new Error("Please Fill all Fields");
            }
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);

            setError(error.message);
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center bg-opacity-10 justify-center gap-2 h-[34rem] w-[32rem]  py-2 border border-black/30 shadow-xl rounded-lg  ">
                <h1 className="text-4xl font-semibold text-primary">{loading ? "Processing" : "Signup"}</h1>
                <hr />

                <div className="flex flex-col w-full items-center">
                    <label htmlFor="username" className="text-lg text-accent font-semibold block w-[80%] text-left mb-2">Username</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-secondary w-[80%]"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                </div>
                <div className="flex flex-col w-full items-center">
                    <label htmlFor="email" className="text-lg text-accent font-semibold block w-[80%] text-left mb-2">Email</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-secondary w-[80%]"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>
                <div className="flex flex-col w-full items-center">
                    <label htmlFor="password" className="text-lg text-accent font-semibold block w-[80%] text-left mb-2">Password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-secondary w-[80%]"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>

                {error && <div className="text-red-600 animate-pulse">{error}</div>}
                <button
                    onClick={onSignup}
                    className="py-2 px-4 text-base hover:scale-110 border border-black/40 rounded-lg hover:bg-black hover:text-white transition mb-4 focus:outline-none">{buttonDisabled ? "No signup" : "Signup"}</button>
                <Link href="/login" className="text-lg mt-2">Visit <span className="text-accent">Login page.</span></Link>
            </div>
        </div>
    )

}