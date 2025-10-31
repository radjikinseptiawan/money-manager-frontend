// "use client"
import { redirect } from "next/navigation";
import PasswordInput from "./component/passwordInput";

export default function Home() {
  redirect('/login')
}
