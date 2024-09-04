import User from "@/models/UserModel";
import { connect } from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

interface UserData {
    username: string;
    password: string;
    email: string;
  }

  export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        console.log(hashedPassword)
        console.log(savedUser)
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
                return NextResponse.json({ message: "User created successfully", success: true, savedUser });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong", status: 500 });
    }
}

async function saveUser(newUser: any): Promise<any> {
    try {
        return await newUser.save();
    } catch (error:any) {
        throw new Error("Error saving user: " + error.message);
    }
}

async function hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword.toString();
}
