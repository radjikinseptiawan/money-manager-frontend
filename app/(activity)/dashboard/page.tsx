"use client"
import { setUsername } from "@/app/features/accountSlice"
import { useAppSelector } from "@/app/hooks"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function Page(){
    const router = useRouter()
    const dispatch = useDispatch()
    const username = useAppSelector((state)=>state.accounts.username)
    const [loading,setLoading] = useState(true)
 
    useEffect(()=>{
        fetch("/api/check-auth",{credentials:"include"})
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.authenticated){
                router.push("/login")
            }else{
                setLoading(false)
                dispatch(setUsername("Radjikin"))
            }
        })
    },[dispatch,router])
 
    if(loading) return <p>loading...</p>

    return(
        <>
            <h1>Ini Halaman Dashboard!</h1>
        </>
    )
}