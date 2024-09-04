import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function getData(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log("coming")
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET! || "default_value");
        console.log("ending-> "+ decodedToken.data)
        return decodedToken.data.id;
    }  catch (error: any) {
        throw new Error(error.message);
    }
}