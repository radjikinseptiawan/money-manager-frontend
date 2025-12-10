import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();


  if (!body) {
    return NextResponse.json({ success: false, message: 'No data provided' });
  }

  const response = await fetch("https://api.zeverial.online/users/login", {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "x-api-key": "6B224A9476D91EAF3175184AA4D21"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!data.access_token) {
    return NextResponse.json({
      success: false,
      message: "Login gagal, backend tidak kirim token",
      backendMessage: data.message
    });
  }

  const cookieStore = cookies();
  (await cookieStore).set("access_token", data.access_token.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain:".zeverial.online",
    maxAge: 60 * 60 * 24
  });

  return NextResponse.json({
    success: true,
    message: "Success to login",
    authorized: true
  });
}



export async function DELETE(req: Request){
    (await cookies()).set("access_token","",{
      httpOnly:true,
      secure:true,
      sameSite:'none',
      path:"/",
      domain:".zeverial.online",
      maxAge:0
    })

    return NextResponse.json({success:true,message:"Success to log out",authorized:false})
}