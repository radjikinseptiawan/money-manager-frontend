'use client'
import { setEmail } from "@/app/features/accountSlice";
import { setOtp } from "@/app/features/otpSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useParams, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useLayoutEffect, useState } from "react";
import '../../auth.css'
const url : string = 'https://project-manager-api-theta.vercel.app/'
export default function Page(){
    return(
        <Suspense>
            <Code/>
        </Suspense>
    )
}

export function Code(){
    const code = useAppSelector((state)=>state.otp.code)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const getEmail = searchParams.get('email')
    const generateOTPCode = async (e : FormEvent)=>{
        e.preventDefault()
        try{
            const response = await fetch("/api/auth/code",{
                method:"GET",
            })

            const data = await response.json()
            window.location.href = `/forgot-password/reset-password?email=${getEmail}&code=${code}`
            return data
        }catch(e){
            console.log(e)
        }
    }

    useLayoutEffect(()=>{
        document.body.style.background = "url(/background_auth.jpg)"
        document.body.style.backgroundPosition = "center"
    },[])

    return(
        <>
                <div className="flex justify-center align-middle items-center h-screen">
                    <div className="flex bg-[#161B22] h-96 items-center justify-center align-middle flex-col w-md md:w-xl p-2 rounded-md shadow-xl">
                        <h1 className="text-2xl my-2 font-extrabold text-blue-600">Verification Otp</h1>
                        <p className="text-gray-400">We already send message from gmail, go check it!.</p>
                        <form action={'../reset-password'} onSubmit={generateOTPCode} method="POST">
                        <div className="flex flex-col">
                        <label htmlFor="login" className="text-blue-400">Code</label>
                        <input type="number" onChange={(e)=>dispatch(setOtp(e.target.value))} className="w-80 p-2 bg-blue-100 text-blue-700 border border-blue-400 rounded-md" id="username" name="username" />
                        </div>
                       <button className="mx-auto bg-blue-400 transition-all hover:bg-blue-600 cursor-pointer hover:text-blue-900 p-2 text-white font-bold my-2 rounded-md">Submit</button>
                </form>
                    </div>
                </div>
        </>
    )
}