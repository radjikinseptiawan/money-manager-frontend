import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const config = {
  runtime:"nodejs",
  matcher: ['/dashboard/:path*']
};
export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  console.log(token)
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const jwtKey = process.env.JWT_SECRET;
    const decode =  jwt.verify(token, jwtKey as string);
   console.log(decode) 
   return NextResponse.next();
  } catch (e) {
    console.log("Redirect ke login (invalid token)",e);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

