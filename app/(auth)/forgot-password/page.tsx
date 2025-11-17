'use client'
import { setEmail } from "@/app/features/accountSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { FormEvent } from "react";
import '../auth.css'
import EmailInput, { emailRegex } from "@/app/component/emailInput";
const url : string = 'https://project-manager-api-theta.vercel.app/'
export default function Page(){
    const email = useAppSelector((state)=>state.accounts.email)
    const dispatch = useAppDispatch()

    const generateOTPCode = async (e : FormEvent)=>{
        e.preventDefault()
        try{    
            if(!emailRegex.test(email)){
                alert("Email tidak valid")
                return
            }
            const response = await fetch(`https://api.zeverial.online/users/forgot-password?email=${email}`,{
                method : "GET",
                headers: {
                    "Content-Type" : "application/json"
                }}) 
                
            const data = await response.json()
            console.log(data)
            if(response.status == 404 || data.email == ''){
                window.location.href = "/forgot-password"
                return
            }
            window.location.href = `forgot-password/code?email=${email}`
            return data
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
                <div className="flex justify-center align-middle items-center h-screen">
                    <div className="flex bg-[#161B22] h-96 items-center justify-center align-middle flex-col w-md md:w-xl p-2 rounded-md shadow-xl">
                        <h1 className="text-2xl my-2 font-extrabold text-blue-600">Forgot Password</h1>
                        <p className="text-gray-400">Please input your email for reset password!.</p>
                        <form onSubmit={generateOTPCode} method="POST">
                        <EmailInput changer={(e)=>dispatch(setEmail(e.target.value))} values={email.toLowerCase()}/>
                       <button type="button" className="mx-2 bg-unser transition-all text-blue-400 border-2 hover:border-blue-900 cursor-pointer hover:text-blue-900 p-2 font-bold my-2 rounded-md" onClick={()=>window.location.href = '/login'}>Cancel</button>
                       <button type="submit" className="mx-2 bg-blue-400 transition-all hover:bg-blue-600 cursor-pointer hover:text-blue-900 p-2 text-white font-bold my-2 rounded-md">Submit</button>
                </form>
                    </div>
                </div>
        </>
    )
}