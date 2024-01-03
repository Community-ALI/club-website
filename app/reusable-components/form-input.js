"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function FormInput({
  title = "",
  type = "text",
  placeholder = "",
  autoFocus = false,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <div className="flex flex-col justify-center items-center mt-[20px] sm:mt-[10px]">
      <p className="text-center text-darkBlue font-[Nunito] font-[600] tracking-wide text-[18px] mb-[10px] xsm:text-[16px]">
        {title}
      </p>
      <div className="relative w-[100%] flex justify-center items-center">
        <input
          required
          type={type === "password" && passwordVisible ? "text" : type}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="w-[100%] px-8 py-3 bg-white rounded-[80px] border-2
          border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px]
          xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
        ></input>
        {type === "password" && (
          <FontAwesomeIcon
          icon={passwordVisible ? faEye : faEyeSlash}
          className="cursor-pointer text-[18px] z-10 absolute top-[18px] right-[22px] xsm:text-[16px] xsm:top-[14px] xsm:right-[20px]"
          onClick={togglePasswordVisibility}
        />
        )}
      </div>
    </div>
  );
}
