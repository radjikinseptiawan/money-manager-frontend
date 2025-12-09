import { NextRequest, NextResponse } from "next/server"

export const POST =async(req:NextRequest)=>{
    try{

    const token = req.nextUrl.searchParams.get("token")
    const cookies = await req.headers.get("cookie") ?? ""
    const response = await fetch(`http://api.zeverial.online/users/verify?token=${token}`,
        {
          method: "GET",
          headers: { "x-api-key": "6B224A9476D91EAF3175184AA4D21", "Cookie" : cookies },
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