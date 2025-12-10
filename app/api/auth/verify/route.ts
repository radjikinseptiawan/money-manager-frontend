import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export const GET =async(req:NextRequest)=>{
    try{

    const token = req.nextUrl.searchParams.get("token")
    const cookieStore = cookies()
    const auth = (await (cookieStore)).get("access_token")?.value ?? ""
    const response = await fetch(`https://api.zeverial.online/users/verify?token=${token}`,
        {
          method: "GET",
          headers: { "x-api-key": "6B224A9476D91EAF3175184AA4D21", "Cookie" : `access_token=${auth}` },
          credentials:"include"
        })
    const data = await response.json()
    return NextResponse.json(data)    
    }catch(e){
        return NextResponse.json({
            message:"Error",
            error : e
        })
    }
}