import User from "@/models/UserModel";
import { connect } from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const token = requestBody.token;
        console.log(token)
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong with verification", status: 500 });
    }
}