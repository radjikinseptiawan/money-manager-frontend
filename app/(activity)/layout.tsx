"use client"
import { Provider } from "react-redux";
import{ store } from "../../app/store";
import Navbar from "../component/navigation/navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Navbar></Navbar>
        <Provider store={store}>
        {children}
        </Provider>
      </>
  );
}
