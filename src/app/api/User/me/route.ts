import User from "@/models/UserModel";
import { connect } from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/helpers/getData";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getData(request);
        console.log("User id i got -> " + userId)
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}