"use client"
import PasswordInput from "@/app/component/passwordInput"
import { setConfirmPassword, setEmail, setPassword, setUsername } from "@/app/features/accountSlice"
import { useAppSelector } from "@/app/hooks"
import { FormEvent } from "react"
import { useDispatch } from "react-redux"
import '../auth.css'
import EmailInput from "@/app/component/emailInput"
import UsernameInput from "@/app/component/usernameInput"
const url : string = 'https://project-manager-api-theta.vercel.app/'
export default function Page(){
    const username = useAppSelector(state => state.accounts.username)
    const password = useAppSelector(state => state.accounts.password)
    const confirmPassword = useAppSelector(state=>state.accounts.confirmPassword)
    const email = useAppSelector(state => state.accounts.email)
    const dispatch = useDispatch()

    const submitAccounts = async (e: FormEvent)=>{
        e.preventDefault()
        try{
            const response = await fetch('https://api.zeverial.online/users/register',{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            const data = await response.json();
            if(!response.ok){
                return response
            }   

            console.log(data)
             window.location.href = '/login'
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <div className="flex justify-center align-middle items-center h-screen">
            <div className="flex bg-[#161B22] h-auto items-center justify-center align-middle flex-col w-md md:w-xl p-2 rounded-md shadow-xl">
                <h1 className="text-2xl my-2 font-extrabold text-blue-600">Register</h1>
                <p className="text-gray-400">Welcome!, please fiell the empty field for register your account!.</p>
                <form action="" className="flex flex-col justify-center items-center" onSubmit={submitAccounts} method="POST">

                <UsernameInput values={username.toLowerCase()} changer={(e)=>dispatch(setUsername(e.target.value))}/>

                <EmailInput changer={(e)=>dispatch(setEmail(e.target.value))} values={email.toLowerCase()}/>

                <PasswordInput changer={(e)=>dispatch(setPassword(e.target.value))} labelTitle="Password"/>

                <PasswordInput changer={(e)=>dispatch(setConfirmPassword(e.target.value))} labelTitle="Confirm Password"/>
                
                <div className="flex flex-col my-4 items-center">
                <button className="bg-blue-400 transition-all hover:bg-blue-600 cursor-pointer hover:text-blue-900 p-2 text-white font-bold my-2 rounded-md">Register</button>
                <a href="/login" className="text-blue-400 text-center hover:underline transition-all hover:text-blue-600">Dont have an account? click here!</a>
                </div>

                </form>
            </div>
        </div>
          
        </>
    )
}