import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value ?? "";
  const id = req.nextUrl.searchParams.get("id")

  const res = await fetch(`https://api.zeverial.online/transaction/${id}`, {
    method: "DELETE",
    headers: {
      "x-api-key": "6B224A9476D91EAF3175184AA4D21",
      "Cookie": `access_token=${accessToken}`,   // ⭐ FIX PENTING DI SINI
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
