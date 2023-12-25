"use client";
import React, { useRef, useState } from "react";
import SectionTitle from "./section-title";
import MainButton from "./main-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  // When enter is pressed on the email input field,
  // the password input field is automatically selected.
  const passwordRef = useRef(null);
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      passwordRef.current.focus();
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="animate-componentFade">
      <SectionTitle text="Club Sign In"></SectionTitle>

      <form className="flex justify-center flex-col">
        <div className="flex flex-col justify-center items-center mt-[20px] sm:mt-[10px]">
          <p className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] mb-[10px] xsm:text-[16px]">
            MJC Club Email
          </p>
          <input
            type="email"
            placeholder="MJC Club Email"
            onKeyPress={handleEnterKeyPress}
            autoFocus
            className="w-[450px] px-8 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
         lg:w-[400px] lg:text-[16px] md:w-[350px] md:text-[15px] md:px-5 xsm:py-[10px] 
         xsm:text-[14px] xsm:w-[80%] xxsm:text-[13px] xxsm:px-4"
          ></input>
        </div>

        <div className="flex flex-col justify-center items-center mt-[10px] relative">
          <p
            className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] 
          mb-[10px] mt-[20px] xsm:text-[16px]"
          >
            MJC Club Password
          </p>
          <div className="relative w-[450px] lg:w-[400px] md:w-[350px] xsm:w-[80%] flex justify-center items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="MJC Club Password"
              ref={passwordRef}
              className="w-[450px] px-8 py-3 bg-white rounded-[80px] border-2
          border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px] 
          xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
            ></input>
            <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            className="cursor-pointer text-[18px] z-10 absolute top-[17px] right-[22px] xsm:text-[16px] xsm:top-[14px] xsm:right-[20px]"
            onClick={togglePasswordVisibility}
            />
          </div>

        </div>
      </form>

      <div className="flex justify-center items-center mt-[70px] md:mt-[60px] xsm:mt-[50px]">
        <MainButton text="Sign In"></MainButton>
      </div>
    </div>
  );
}
