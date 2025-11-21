import { NextRequest, NextResponse } from "next/server"

export const GET = async(req : NextRequest)=>{
    const email = req.nextUrl.searchParams.get("email")
    const cookie = await req.headers.get("cookie") ?? "";
    try{
        const response = await fetch(`http://api.zeverial.online/users/forgot-password?email=${email}`,{    
        method : "GET",
        headers: {
        "Content-Type" : "application/json",
        "x-api-key" : "6B224A9476D91EAF3175184AA4D21",
        "Cookie" : cookie
        }}) 

        const data = await response.json()

        return NextResponse.json(data)
    }catch(e){
        return NextResponse.json(e)        
    }
}