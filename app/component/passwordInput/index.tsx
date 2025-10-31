"use client"
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function PasswordInput({
  changer,
  labelTitle,
}: {
  labelTitle: string;
  changer: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<boolean>(false);

  const iconEye = () => {
    setImage((prev) => !prev);
  };

  const passwordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    changer(e);

    if (value === "") {
      setError("");
    } else if (!passwordRegex.test(value)) {
      setError(
        "Password minimal 8 karakter, berisi huruf besar, huruf kecil, angka, dan simbol."
      );
    } else {
      setError("");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={labelTitle} className="text-blue-400">
          {labelTitle}
        </label>
        <div className="flex">
          <input
            type={image ? "text" : "password"}
            required
            onChange={passwordValidation}
            className={`w-72 p-2 bg-blue-100 text-blue-700 border border-t-blue-400 border-l-blue-400 border-b-blue-400 rounded-bl-md rounded-tl-md ${
              image ? "border-r-transparent" : "border-r-transparent"
            }`}
            id={labelTitle}
            name={labelTitle}
          />
          <button
            type="button"
            onClick={iconEye}
            className="w-8 bg-blue-100 text-blue-700 border border-l-transparent border-t-blue-400 border-b-blue-400 border-r-blue-400 rounded-br-md rounded-tr-md p-2"
          >
            <Image
              alt="eye-status"
              src={image ? "/eye.svg" : "/eye-off.svg"}
              width={20}
              height={20}
            />
          </button>
        </div>
        {error && (
          <span
            style={{ fontSize: "10px" }}
            className="text-red-500 w-72 mt-1 transition-all"
          >
            {error}
          </span>
        )}
      </div>
    </>
  );
}
