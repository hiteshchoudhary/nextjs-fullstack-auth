"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
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
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
    <div className="flex items-center justify-center min-h-screen py-2">
        <div className="flex flex-col border-white border-[1px] min-w-fit w-[40%] max-w-[600px] px-4 py-5 rounded-lg">
        <h1 className="font-bold text-xl text-center mb-2 md:text-2xl lg:text-3xl">{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username" className="text-xl my-[10px]">username</label>
        <input 
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="Enter username"
            />
        <label htmlFor="email" className="text-xl my-[10px]">email</label>
        <input 
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Enter your email address"
            />
        <label htmlFor="password" className="text-xl my-[10px]">password</label>
        <input 
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Enter your password"
            />
            <button
            onClick={onSignup}
            className="p-2 border font-semibold mt-[3px] text-[1.1rem] border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login" className="hover:underline text-center cursor-pointer">Visit login page</Link>
        </div>
        </div>
    )

}