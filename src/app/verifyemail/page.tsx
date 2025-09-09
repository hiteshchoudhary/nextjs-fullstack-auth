"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true); 

    const verifyUserEmail = async (urlToken: string) => {
        try {
            await axios.post("/api/users/verifyemail", { token: urlToken });
            setVerified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
            setVerified(false);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1] || "";
        setToken(urlToken);
        if (urlToken) {
            verifyUserEmail(urlToken);
        } else {
            setLoading(false); // No token found, stop loading
        }
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <h1 className="text-3xl font-semibold text-white">Verifying Email...</h1>
                    <p className="text-gray-400">Please wait a moment.</p>
                </>
            );
        }

        if (error) {
            return (
                <>
                    {/* Error Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-3xl font-semibold text-white">Verification Failed</h1>
                    <p className="text-gray-400 text-center">The verification link is invalid or has expired. Please try signing up again.</p>
                    <Link href="/login" className="text-white font-semibold hover:cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-center">
                        Go to Login
                    </Link>
                </>
            );
        }

        if (verified) {
            return (
                <>
                    {/* Success Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-3xl font-semibold text-white">Email Verified!</h1>
                    <p className="text-gray-400">You can now log in to your account.</p>
                    <Link href="/login" className="text-white font-semibold hover:cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-center">
                        Login Now
                    </Link>
                </>
            );
        }

         return (
             <>
                <h1 className="text-3xl font-semibold text-white">No Token Found</h1>
                <p className="text-gray-400 text-center">It seems you've reached this page without a verification token.</p>
                 <Link href="/signup" className="text-white font-semibold hover:cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-center">
                    Go to Signup
                </Link>
             </>
        )
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4">
            <div className="border-1 border-white p-8 flex flex-col items-center gap-5 rounded-lg shadow-lg bg-gray-950 w-full max-w-md">
                {renderContent()}
            </div>
        </div>
    );
}
