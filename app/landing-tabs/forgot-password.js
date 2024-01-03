"use client";
import React, { useRef, useState } from "react";
import SectionTitle from "../reusable-components/section-title";
import MainButton from "../reusable-components/main-button";

export default function PasswordReset( {setCurrentPage}) {
  const submitRef = useRef(null);

  function clickSubmit() {
    submitRef.current.click();
  };

  function submitForm(e) {
    e.preventDefault();
    fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target[0].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // if the password reset email was sent successfully, alert the user
        alert(data.message);
    });
  };

  return (
    <div className="animate-componentFade">
      <SectionTitle text="Password Reset"></SectionTitle>

      <form className="flex justify-center flex-col w-[450px] lg:w-[400px] md:w-[350px] xsm:w-[80%] mr-auto ml-auto" onSubmit={submitForm}>
        <div className="flex flex-col justify-center items-center mt-[20px] sm:mt-[10px]">
          <p className="text-center text-darkBlue font-[Nunito] font-[600] tracking-wide text-[18px] mb-[10px] xsm:text-[16px]">
            Club Email
          </p>
          <input
            required
            type="email"
            placeholder="MJC Club Email"
            autoFocus
            className="w-[100%] px-8 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
         lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px] 
         xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
          ></input>
        </div>
        {/* invisible submit button */}
        <input type="submit" className="hidden" ref={submitRef}></input>
      </form>

      <div className="flex justify-center items-center mt-[40px]">
        <MainButton onClick={clickSubmit} text="Reset Password"></MainButton>
      </div>
    </div>
  );
}
