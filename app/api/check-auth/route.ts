import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("access_token");
  return Response.json({ authenticated: !!token });
}
