import { ChangeEvent, useState } from "react"

export const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{2,}(\.[a-zA-Z]{2,3})+$/;
  

export default function EmailInput({values,changer}:{
    changer: (e :ChangeEvent<HTMLInputElement>)=>void
    values:string
}){
    const [error,setError] = useState('')
     const emailInputValidation = (e: ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        changer(e)
        if(value === ""){
            setError("")
        }else if(!emailRegex.test(value)){
            setError(  "Format email tidak valid. Contoh: nama@domain.ac.id atau nama@domain.com")
        }else{
            setError("")
        }
     }
    return(
        <>
            <div className="flex flex-col my-4">
                <label htmlFor="email" className="text-blue-400">Email</label>
                <input autoCorrect="off" autoComplete="off" type="email" onChange={emailInputValidation} value={values} className="border-blue-400 bg-blue-100 w-80 text-blue-700 p-2 border text-md rounded-md" id="email" name="email"/>
                {
                    error && (
                        <span style={{fontSize:"7px"}} className="text-red-500 text-sm mt-1 transition-all">
                            {error}
                        </span>
                    )
                }
            </div>        
        </>
    )
}