import {  NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Logout request come")
        const response=NextResponse.json({ message: "User successfuly Logout", status: 500 });
        response.cookies.set('token','',{
             httpOnly:true,
             expires:new Date(0)
        })
        return response;
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong in Logout", status: 500 });
    }
}