"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

function VerifyEmail() {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [token, setToken] = useState('');


    // Simulating verification process
    const verifyEmail = async () => {
        try {
            await axios.post('/api/User/verifyEmail', { token });
            setVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    };
    useEffect(() => {
        setError(false)
        const  query  = router; 
        const token=query.token
        console.log("Netx Token->" + token)// Access 'token' query parameter
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, []);
    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-500">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Verify Email</h1>
                <h2 className="text-xl font-bold mb-4 text-green-400">{token ? `Token: ${token}` : "No token"}</h2>

                {verified && (
                    <div className="text-center">
                        <h2 className="text-2xl text-green-600 font-bold mb-4">Email Verified</h2>
                        <Link href="/Login">
                        Login
                    </Link>
                    </div>
                )}

                {error && (
                    <div className="text-center">
                        <h2 className="text-2xl text-red-600 font-bold mb-4">Error</h2>
                        <p className="text-sm text-gray-600">There was an error verifying your email.</p>
                    </div>
                )}

                <button
                    onClick={verifyEmail}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    Verify Email
                </button>
            </div>
        </div>
    );
}

export default VerifyEmail;
