"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
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
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <main className="bg-[#1E293B] min-h-screen min-w-full grid place-items-center">
  <div className="bg-[rgba(255,_255,_255,_0.05)] w-80 h-fit rounded-2xl shadow-2xl grid-flow-row">
    <div className="m-4 mt-0 box-border">
      <h1 className="p-4 pl-0 text-[#28A0F1] text-center text-2xl">{loading ? "Processing" : "Login"}</h1>
      <hr/>
    </div>
    <div className="m-4 p-4 box-border">
      <label htmlFor="email"><h1 className="p-4 pl-0 text-[#28A0F1]">Email</h1></label>
      <input className="p-2 h-8 w-full rounded-sm border-[2px] border-[#28A0F1] placeholder:opacity-50 focus:placeholder:opacity-100 outline-none"id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Email"></input>
    </div>
    <div className="m-4 mt-0 p-4 pt-0 box-border">
    <label htmlFor="password"><h1 className="p-4 pl-0 text-[#28A0F1]">Password</h1></label>
      <input className="p-2 h-8 w-full rounded-sm border-[2px] border-[#28A0F1] placeholder:opacity-50 focus:placeholder:opacity-100 outline-none"id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Password"></input>
    </div>
    <div className="m-4 p-4 box-border grid">
      <button className="text-[#28A0F1] border-[0.125em] border-[#28A0F1] border-solid rounded-lg p-2 m-2 shadow-[0_0_10px_2px_#28A0F1,_0_0_10px_2px_#28A0F1_inset] [text-shadow:_0_0_0.125em] hover:text-[#1E293B] hover:bg-[#28A0F1] hover:shadow-[0_0_100px_10px_#28A0F1] hover:[text-shadow:_none]" onClick={onLogin}>Login Here</button>
    </div>
    <div className="m-4 p-4 box-border grid">
    <Link href="/signup" className="text-[#28A0F1] border-[0.125em] border-[#28A0F1] border-solid rounded-lg p-2 m-2 shadow-[0_0_10px_2px_#28A0F1,_0_0_10px_2px_#28A0F1_inset] [text-shadow:_0_0_0.125em] hover:text-[#1E293B] hover:bg-[#28A0F1] hover:shadow-[0_0_100px_10px_#28A0F1] hover:[text-shadow:_none] text-center">Visit SignUp Page</Link>
    </div>
  </div>
</main>
 )

}