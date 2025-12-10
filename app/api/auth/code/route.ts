import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const body = await req.json()
    const response = await fetch(
      `https://api.zeverial.online/users/input_otp?email=${body.email}&code=${body.code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "6B224A9476D91EAF3175184AA4D21",
        },
        body:JSON.stringify({
          email: email,
          body
        })
      }
    );

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};
