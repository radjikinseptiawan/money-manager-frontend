"use client"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

export default function Page(){
    return(
        <Suspense>
            <Verify/>
        </Suspense>
    )
}

function Verify(){
    const [isVerification,setIsverification] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const fetchingTheResponse = async ()=>{
        try{
            const response = await fetch(`https://api.zeverial.online/users/verify?token=${token}`,{
                method:"GET",
                headers:{"x-api-key" : "6B224A9476D91EAF3175184AA4D21"}
            })
            const data = await response.json()
            if(!data){
                console.log(data)
            }
            setIsverification(true)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        fetchingTheResponse()
    },[])
    return(
        <div className="flex justify-center h-screen items-center">
        <div>
        <div className="bg-[#161B22] border-2 text-blue-500 p-2 rounded-md w-xl text-center">
            {
                isVerification ? 
                <>
             <h1 className="font-bold underline text-xl">Thank you for click the link!</h1>
             <p>Your account`s has been <span className="text-green-500 font-bold">success</span> for verification, lets explore the app</p>        
                </>
                :                
                <div className="flex flex-col justify-center">
                    <img src={"/loader.svg"} className="text-center animate-spin mx-auto"/>
                    <h1>Loading...</h1>
                </div>
            
            }

        </div>
        </div>
        </div>
    )
}