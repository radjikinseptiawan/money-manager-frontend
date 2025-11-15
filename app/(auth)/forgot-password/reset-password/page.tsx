'use client'
import PasswordInput from "@/app/component/passwordInput";
import { setPassword } from "@/app/features/accountSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { redirect, useSearchParams } from "next/navigation";
import { FormEvent, Suspense } from "react";
import '../../auth.css'

const url : string = 'https://project-manager-api-theta.vercel.app/'

export default function Page(){
    return(
        <Suspense>
            <ResetPassword></ResetPassword>
        </Suspense>
    )
}
export function ResetPassword(){
    const password = useAppSelector((state)=>state.accounts.password)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const generateOTPCode = async (e : FormEvent)=>{
        e.preventDefault()
        try{
            const response = await fetch(`https://api.zeverial.online/new_password`,{
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    newPassword: password,
                    email : email
                })
            }) 
            const data = await response.json()
            console.log(data)
            redirect("/login")
            return data
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
                <div className="flex justify-center align-middle items-center h-screen">
                    <div className="flex bg-[#161B22] h-96 items-center justify-center align-middle flex-col w-md md:w-xl p-2 rounded-md shadow-xl">
                        <h1 className="text-2xl my-2 font-extrabold text-blue-600">Reset Password</h1>
                        <p className="text-gray-400">Please input your new password!.</p>
                        <form action={'/'} onSubmit={generateOTPCode} method="POST">
                        <PasswordInput changer={(e)=>dispatch(setPassword(e.target.value))} labelTitle="New Password"/>
                       <button className="mx-auto bg-blue-400 transition-all hover:bg-blue-600 cursor-pointer hover:text-blue-900 p-2 text-white font-bold my-2 rounded-md">Submit</button>
                </form>
                    </div>
                </div>
        </>
    )
}