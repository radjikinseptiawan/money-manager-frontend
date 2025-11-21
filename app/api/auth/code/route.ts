import { NextRequest, NextResponse } from "next/server"

export const GET = async(req : NextRequest, context : {params : { email : Promise<string>}})=>{
    try{
            const getEmail = req.nextUrl.searchParams.get("email")
            const code = req.nextUrl.searchParams.get("code")
            const response = await fetch(`http://api.zeverial.online/users/input_otp?email=${getEmail}&code=${code}`,{
                method : "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "x-api-key" : "6B224A9476D91EAF3175184AA4D21"
                }}) 
            const data = await response.json()

            return NextResponse.json(data)
    }catch(e){
        return NextResponse.json(e)
    }
}