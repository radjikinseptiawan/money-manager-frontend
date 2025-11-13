import { cookies } from "next/headers"

export async function POST(req :Request){
  const {access_token} = await req.json()

  ;(await cookies()).set('access_token',access_token,{
    httpOnly:true,
    secure:true,
    sameSite:'none',
    path:'/',
    maxAge:60 * 60 * 24 * 7    
  })

  return Response.json({
    success:true
  })
}