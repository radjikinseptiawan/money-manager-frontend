"use client"

import { ReactNode, useState } from "react";

export default function Navbar({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const setLogout = async()=>{
    try{
      const response = await fetch(`/api/auth`,{
        method:"DELETE",
        credentials:"include"
      })
      await fetch('/api/auth',{
        method:"DELETE"
      })
      if(!response.ok){
        return 
      }

      window.location.href = "/login"
    }catch(e){
      console.log(e)
      return
    }
  }
  return (
    <>
      <nav className="bg-[#161B22] w-full fixed top-0 z-20 p-3 flex justify-between items-center shadow-md">
        <div className="text-white font-bold text-lg">
          Zever<span className="text-blue-500">ial</span>
        </div>

        <button onClick={() => setOpen(true)}>
          <img src="menu.svg" alt="menu" />
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-[#161B22] shadow-lg z-20
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-900">
          <h1 className="text-white text-lg font-semibold">Menu</h1>
          <button onClick={() => setOpen(false)} className="text-white text-xl">
            ✕
          </button>
        </div>

        <ul className="text-white p-4 space-y-4">
          <li className="cursor-pointer hover:text-blue-400" onClick={()=>window.location.href = "/dashboard"}>Dashboard</li>
          <li className="cursor-pointer hover:text-blue-400" onClick={setLogout}>Logout</li>
        </ul>
      </div>
    </>
  );
}
