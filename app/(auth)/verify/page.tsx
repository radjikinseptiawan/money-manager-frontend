"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  );
}

function Verify() {
  const [isVerification, setIsVerification] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const fetchingTheResponse = async () => {
    try {
      const response = await fetch("api/auth/verify",{
        method:"GET"
      });

      const data = await response.json();
      if (!data) {
        console.log(data);
      }

      setIsVerification(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchingTheResponse();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="bg-[#161B22] border-2 border-[#30363d] p-6 rounded-md max-w-lg text-center shadow-lg">
        {isVerification ? (
          <>
            <h1 className="font-bold underline text-xl mb-2 text-blue-400">
              Thank you for clicking the link!
            </h1>
            <p className="text-gray-300">
              Your account has been{" "}
              <span className="text-green-500 font-bold">successfully</span>{" "}
              verified. You can now explore the app!
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="/loader.svg"
              className="animate-spin w-10 h-10 mb-2"
              alt="loading"
            />
            <h1 className="text-gray-300">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
