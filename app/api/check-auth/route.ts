import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = "RadjikinSeptiawan123";

export async function GET() {
  const token = (await cookies()).get("access_token"); // ✅ tambahkan await
  console.log("TOKEN ACCEPTED!", token);

  if (!token) {
    return Response.json({ authenticated: false });
  }

  try {
    const data = jwt.verify(token.value, JWT_SECRET);
    const tokenStore = token.value;
    return Response.json({ authenticated: true, tokenStore, data });
  } catch (e: any) {
    return Response.json({
      message: "Failed",
      error: e.message,
    });
  }
}
