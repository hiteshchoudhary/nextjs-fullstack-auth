"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserData {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    
    const logout = async () => {
        try {
            const logout = await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get("/api/users/me");
                setData(res.data.data);
            } catch (error: any) {
                console.error(error.message);
                toast.error("Failed to fetch user details. Please log in again.");
                // Optionally, redirect to login if the token is invalid/expired
                // router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
            <div className="border-1 border-white p-8 flex flex-col items-center gap-5 rounded-lg shadow-lg bg-gray-950 w-full max-w-md">
                <h1 className="text-4xl font-bold">Your Profile</h1>
                <hr className="w-full border-gray-500" />

                {loading ? (
                    <p className="text-lg">Loading details...</p>
                ) : data ? (
                    <div className="text-left w-full space-y-4">
                        <p className="text-lg">
                            <span className="font-semibold text-gray-400">Username:</span> {data.username}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-400">Email:</span> {data.email}
                        </p>
                        <p className="text-lg flex items-center gap-2">
                            <span className="font-semibold text-gray-400">Status:</span> 
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${data.isVerified ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                {data?.isVerified ? "Verified" : "Not Verified"}
                            </span>
                        </p>
                        <p className="text-center pt-2">
                            <Link href={`/profile/${data?._id}`} className="text-blue-400 hover:underline">
                                View Public Profile
                            </Link>
                        </p>
                    </div>
                ) : (
                    <p className="text-lg text-red-400">Could not load user data.</p>
                )}

                <button
                    onClick={logout}
                    className="w-full bg-red-600 p-3 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 mt-4 hover:cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}