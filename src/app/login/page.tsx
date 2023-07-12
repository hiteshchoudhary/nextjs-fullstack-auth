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
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl text-center mb-6">{loading ? "Processing..." : "Login"}</h2>
                <div id="mainContainer" className="bg-white shadow-md rounded px-8 pt-6 pb-5 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id="email" type="email" placeholder="Email" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} id="password" type="password" placeholder="Password" required />
                    </div>

                    <div className="flex items-center justify-center">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onLogin} disabled={buttonDisabled ? true : false} type="submit">
                            Login
                        </button>
                    </div>
                    <Link href={"/signup"} className="text-black text-center block mt-4" >Don't have an account <span className="text-red-300 underline" >signup</span> here</Link>
                </div>

            </div>
        </div>


    )

}