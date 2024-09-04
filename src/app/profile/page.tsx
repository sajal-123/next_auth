'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
interface User {
    name: string;
    email: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        const response = await axios.get('/api/User/me');
        console.log(response.data.data._id)
        setData(response.data.data._id);
    }
    const logout = async () => {
        try {
            await axios.get('/api/User/Logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-5 shadow-md">
            <Image
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnhoHDIbSi0WJkzGYr6wemnCS2OzSRkhokmA&usqp=CAU'
                width={500}
                height={500}
                className="w-32 h-32 rounded-full object-cover mb-4"
                alt="user.name"
            />
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>

            <p className="text-base text-gray-600">Email Section</p>

            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>
        </div>
    );
};
