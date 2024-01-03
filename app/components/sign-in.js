"use client";
import React, { useRef, useState } from "react";
import SectionTitle from "./section-title";
import MainButton from "./main-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignIn( {setCurrentPage}) {
  const submitRef = useRef(null);
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

  function clickSubmit() {
    submitRef.current.click();
  };

  function submitForm(e) {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // if the account was created successfully, redirect to the sign in page
        if(data.message === "Success"){
          console.log(data.token);
          localStorage.setItem('token', data.token);
          setCurrentPage('home');
        }
        else {
          alert(data.message);
        }
    });
  };

  function forgotPassword() {
    setCurrentPage('forgotPassword');
  };

  return (
    <div className="animate-componentFade">
      <SectionTitle text="Club Sign In"></SectionTitle>

      <form className="flex justify-center flex-col w-[450px] lg:w-[400px] md:w-[350px] xsm:w-[80%] mr-auto ml-auto" onSubmit={submitForm}>
        <div className="flex flex-col justify-center items-center mt-[20px] sm:mt-[10px]">
          <p className="text-center text-darkBlue font-[Nunito] font-[600] tracking-wide text-[18px] mb-[10px] xsm:text-[16px]">
            Club Email
          </p>
          <input
            required
            type="email"
            placeholder="MJC Club Email"
            onKeyPress={handleEnterKeyPress}
            autoFocus
            className="w-[100%] px-8 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
         lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px] 
         xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
          ></input>
        </div>

        <div className="flex flex-col justify-center items-center mt-[10px] relative">
          <p
            className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] 
          mb-[10px] mt-[20px] xsm:text-[16px] tracking-wide"
          >
            Club Password
          </p>
          <div className="relative w-[100%] flex justify-center items-center">
            <input
              required
              type={passwordVisible ? "text" : "password"}
              placeholder="MJC Club Password"
              ref={passwordRef}
              className="w-[100%] px-8 py-3 bg-white rounded-[80px] border-2
          border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px] 
          xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
            ></input>
            <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            className="cursor-pointer text-[18px] z-10 absolute top-[18px] right-[22px] xsm:text-[16px] xsm:top-[14px] xsm:right-[20px]"
            onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <div className="flex justify-between mt-[30px] font-[Nunito] text-lightBlue underline underline-offset-4">
            <p className="px-[10px] md:text-[14px] sm:px-[5px] xxsm:text-[12px] cursor-pointer hover:text-darkBlue duration-200 ease" 
            onClick={() => setCurrentPage('createAccount')}>Create New Account</p>
            <p className="px-[10px] md:text-[14px] sm:px-[5px] xxsm:text-[12px] cursor-pointer hover:text-darkBlue duration-200 ease" onClick={forgotPassword}
            >Forgot Password?</p>
        </div>
        {/* invisible submit button */}
        <input type="submit" className="hidden" ref={submitRef}></input>
      </form>

      <div className="flex justify-center items-center mt-[40px]">
        <MainButton onClick={clickSubmit} text="Sign In"></MainButton>
      </div>
    </div>
  );
}
