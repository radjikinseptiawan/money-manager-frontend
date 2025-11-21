import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req : NextRequest,context : {params : Promise<{ id : string}>}){
    const cookie = req.headers.get("cookie") ?? ""
    const {id} = await context.params;
    console.log(id)
    const res = await fetch(`http://api.zeverial.online/transaction/${id}`,{
        method:"DELETE",
        headers: {
          "x-api-key" : "6B224A9476D91EAF3175184AA4D21",
          "Cookie" : cookie
        },
    })

    
  const data = await res.json();
  console.log(data)
  return NextResponse.json(data);
}