import { NextRequest, NextResponse } from "next/server"

export async function GET(req : NextRequest){
    const cookie = req.headers.get("cookie")!;
    const res = await fetch(`https://api.zeverial.online/transaction`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json", 
          "x-api-key" : "6B224A9476D91EAF3175184AA4D21",
          "Cookie" : cookie
        },
        credentials:"include"
    })
        const data =await res.json()
    return NextResponse.json(data)
}

export async function POST(req:NextRequest){
    const cookie =req.headers.get("cookie") ?? ""
    const res = await fetch("https://api.zeverial.online/transaction",{
        method:"POST",
           headers: { 
          "Content-Type": "application/json", 
          "x-api-key" : "6B224A9476D91EAF3175184AA4D21",
          "Cookie" : cookie,
        },
        credentials:"include"
    })

    const data = await res.json()
    return NextResponse.json(data)
}


