import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req : NextRequest,context : {params : Promise<{ id : string}>}){
    const cookieStore = cookies();
    const session = (await cookieStore).toString();
    const {id} = await context.params;

    const res = await fetch(`http://api.zeverial.online/transaction/${id}`,{
        method:"DELETE",
        headers: {
          "x-api-key" : "6B224A9476D91EAF3175184AA4D21",
          "Cookie" : session
        },
        credentials:"include"
    })

    
  const data = await res.json();
  return NextResponse.json(data);
}