import { ReactNode } from "react";

export default function Navbar({ children }: { children?: ReactNode }) {
  const logoutAccount = async()=>{
    try{
      const response = await fetch("http://localhost:3000/users/logout",{
        method:"POST"
      })
      
      if (response.ok) {
      window.location.href = "/login";
    } else {
      console.error("Gagal logout!");
    }
    }catch(e){
      console.error(e)
    }
  }

  return (
    <nav className="bg-[#161B22] w-full fixed top-0 z-10 p-3 flex justify-between items-center shadow-md">
      <div className="text-white font-bold text-lg">
        Zever<span className="text-blue-500">ial</span>
      </div>

      <div className="hidden md:flex gap-6 text-gray-300">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="hover:text-white transition-colors">About</a>
        <a href="#" className="hover:text-white transition-colors" onClick={logoutAccount}>logout</a>
      </div>

    </nav>
  );
}
