"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function page() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof typeof user) => {
        const { value } = e.target;
        console.log(process.env.DOMAIN)
        console.log(process.env)
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSignUp = async () => {
        try {
            setIsLoading(true);
            console.log(user)
            const response = await axios.post(`/api/User/Login`, user);
            setIsLoading(false);
            console.log('Response from backend:', response.data);
            toast.success('Login successful!');
            router.push('/profile')
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            toast.error('Error signing up. Please try again.');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-blue-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-blue-500 shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Log In
                            </h1>

                            <div className="w-full flex-1 mt-8">

                                <div className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email" onChange={(e) => handleInputChange(e, 'email')} placeholder="Email" value={user.email} />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" onChange={(e) => handleInputChange(e, 'password')} placeholder="Password" value={user.password} />
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300
                                         ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={handleSignUp}
                                        disabled={buttonDisabled || isLoading}
                                    >
                                        {isLoading ? (
                                            <span>Loading...</span>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                </svg>
                                                <span className="ml-3">Sign In</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign In with Google
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <Link href="/signup">
                                            Don't Have n account
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default page
