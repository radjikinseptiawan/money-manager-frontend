import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { access_token } = await req.json();
  console.log(access_token)
  if (!access_token) {
    return NextResponse.json({ success: false, message: 'No token provided' });
  }

  (await cookies()).set('access_token', access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    domain:".zeverial.online",
    maxAge: 60 * 60 * 24, 
  });
  return NextResponse.json({ success: true,message:"Success to login",authorized:true });
}


export async function DELETE(req: Request){
    (await cookies()).delete("access_token")

    return NextResponse.json({success:true,message:"Success to log out",authorized:false})
}