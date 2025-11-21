import { NextRequest, NextResponse } from "next/server"

export const POST = async(req:NextRequest)=>{
    try{
        const body = req.json()
        const cookie = await req.headers.get("cookie") ?? ""
        const response = await fetch(`http://api.zeverial.online/users/new_password`,{
            method:"POST",
            body:JSON.stringify(body),
            credentials:"include",
            headers: {
            "Content-Type" : "application/json",
            "x-api-key" : "6B224A9476D91EAF3175184AA4D21",
            "Cookie" : cookie
            }})
        const data =await response.json()
        console.log(data)
        return NextResponse.json(data)
    }catch(e){
        return NextResponse.json(e)
    }
}