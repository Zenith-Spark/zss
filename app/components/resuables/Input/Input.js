'use client'

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export const Input = ({ Labelvalue, Email, width, Password, value, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const toggleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative">
      <input
        type={Email ? 'email' : Password ? (passwordVisible ? 'text' : 'password') : 'text'}
        // pattern={Password && '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'}
        // title={Password &&"Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"}
        id="floating_outlined"
        className={`block px-2.5 pb-2.5 pt-4 text-sm bg-transparent border-gray-300 appearance-none text-white dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-slate-800 peer border-b w-full py-2 transition duration-1000 ${width ? 'w-full' : ''}`}
        value={value}
        onChange={onChange}
        required
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-white font-semibold dark:text-white duration-500 transform -translate-y-4 scale-75 top-2 origin-[0] px-0 peer-focus:px-2 peer-focus:dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ml-2 -z-10"
      >
        {Labelvalue}
      </label>
      {Password && (
        <span className="absolute text-white top-2 right-5 cursor-pointer" onClick={toggleShowPassword}>
          {passwordVisible ? <Eye /> : <EyeClosed />}
        </span>
      )}
    </div>
  );
};
