import User from "@/models/UserModel";
import { connect } from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user" + user);
        const validUser = await bcryptjs.compare(password, user.password)
        if (!validUser) {
            return NextResponse.json({ error: "Invalid Password"}, {status: 500 });
        }
        const userIdString=user._id.toString();
        console.log(userIdString)
        console.log("validation -> "+validUser);
        const Tokendata = {
            id: userIdString,
            email: user.email,
            username: user.username
        };
        const jwtToken = jwt.sign({
            data: Tokendata
        }, process.env.TOKEN_SECRET! || "default_value", { expiresIn: '1h' });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        await response.cookies.set("token", jwtToken, {
            httpOnly: true, // so that it will be visible on website but only modified through backend
        });
        return response;
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong With Login", status: 500 });
    }
}
