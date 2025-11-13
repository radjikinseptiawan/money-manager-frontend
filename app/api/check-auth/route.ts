import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function GET() {
  const token = (await cookies()).get("access_token"); // ✅ tambahkan await
  console.log("TOKEN ACCEPTED!", token);

  if (!token) {
    return Response.json({ authenticated: false });
  }

  try {
    const data = jwt.verify(token.value, process.env.JWT_SECRET as string);
    const tokenStore = token.value;
    return NextResponse.json({ authenticated: true, tokenStore, data });
  } catch (e: any) {
    return NextResponse.json({
      message: "Failed",
      error: e.message,
    });
  }
}
