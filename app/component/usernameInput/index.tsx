import { ChangeEvent } from "react";

export default function UsernameInput({values,changer}:{values:string,changer:(e:ChangeEvent<HTMLInputElement>)=>void}){
    const noSpaceValidation = (e:ChangeEvent<HTMLInputElement>)=>{
        const noSpaceValue = e.target.value.replace(/\s+/g,"").toLocaleLowerCase()
        e.target.value = noSpaceValue
        changer(e)
    }
    return(
        <>
        <div className="flex flex-col">
            <label htmlFor="login" className="text-blue-400">username</label>
            <input type="text" onChange={noSpaceValidation} autoCorrect="off" autoComplete="off" className="w-80 p-2 bg-blue-100 text-blue-700 border border-blue-400 rounded-md" id="username" name="username" />
        </div>
        </>
    )
}