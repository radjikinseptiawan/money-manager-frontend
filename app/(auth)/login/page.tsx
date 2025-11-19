"use client"
import PasswordInput, { passwordRegex } from "@/app/component/passwordInput"
import { setPassword, setUsername } from "@/app/features/accountSlice"
import { useAppSelector } from "@/app/hooks"
import { FormEvent, useLayoutEffect } from "react"
import { useDispatch } from "react-redux"
import '../auth.css'
import { useRouter } from "next/navigation"
import UsernameInput from "@/app/component/usernameInput"

export default function Page(){
    const username = useAppSelector((state)=>state.accounts.username)
    const password = useAppSelector((state)=>state.accounts.password)
    const dispatch = useDispatch()
    const router = useRouter()
    useLayoutEffect(()=>{
        document.body.style.background = "url(/background_auth.jpg)"
        document.body.style.backgroundPosition = "center"
    },[])

    const loginToAccount = async(e : FormEvent)=>{
        e.preventDefault()
        try{
            if(!passwordRegex.test(password)){
                alert("password salah!")
                return
            }

            const response = await fetch(`http://api.zeverial.online/users/login`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    username: username,
                    password: password
                }),

            })
            const data = await response.json()
            console.log(data)
            await fetch('/api/auth',{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({access_token : data.access_token.access_token})
            })

            router.push('/dashboard')
            return response
        }catch(e){
            console.log(e)
        }
    }

    return(
        <>
        <div className="flex justify-center align-middle items-center h-screen">
            <div className="flex bg-[#161B22] h-96 items-center justify-center align-middle flex-col w-md md:w-xl p-2 rounded-md shadow-xl">
                <h1 className="text-2xl my-2 font-extrabold text-blue-600">Login</h1>
                <p className="text-gray-400 text-center">Selamat datang kembali!, mohon isi kolom kosong untuk login ke akun mu.</p>
                <form onSubmit={loginToAccount} method="POST">
                <UsernameInput values={username} changer={(e)=>dispatch(setUsername(e.target.value))}/>
                <div className="flex flex-col my-4">
                <PasswordInput changer={(e)=>dispatch(setPassword(e.target.value))} labelTitle="password"/>
                <a href="/forgot-password" className="text-blue-400 hover:underline transition-all hover:text-blue-600">Forgot password?</a>
                </div>
                <div className="flex justify-center items-center flex-col">
                <button className="mx-auto bg-blue-400 transition-all hover:bg-blue-600 cursor-pointer hover:text-blue-900 p-2 text-white font-bold my-1 rounded-md">Login</button>
                <a href="/register" className="text-blue-400 hover:underline transition-all hover:text-blue-600">Belum punya akun? klik disini!</a>
               </div>
               </form>
            </div>
        </div>
        </>
    )
}