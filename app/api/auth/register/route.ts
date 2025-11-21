import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
        const cookie = req.headers.get("cookie") ?? ""
        const body = await req.json();
        const response = await fetch("http://api.zeverial.online/users/register",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Cookie" : cookie,
                "x-api-key" : "6B224A9476D91EAF3175184AA4D21"                
            },
            body:JSON.stringify(body),
            credentials:"include",
        })

        const data = await response.json()
        console.log(data)
        return NextResponse.json(data)
    
}