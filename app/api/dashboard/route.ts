import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const session = (await cookieStore).get("access_token")?.value ?? "";

  const res = await fetch("https://api.zeverial.online/transaction", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "6B224A9476D91EAF3175184AA4D21",
      Cookie: `access_token=${session}`
    },
    cache: "no-store"
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const session = (await cookieStore).get("access_token")?.value ?? "";

  const body = await req.json();

  const res = await fetch("https://api.zeverial.online/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "6B224A9476D91EAF3175184AA4D21",
      Cookie: `access_token=${session}`
    },
    body: JSON.stringify(body),
    cache: "no-store"
  });

  const data = await res.json();
  return NextResponse.json(data);
}
