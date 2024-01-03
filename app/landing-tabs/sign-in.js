"use client";
import React, { useRef, useState } from "react";
import SectionTitle from "../reusable-components/section-title";
import MainButton from "../reusable-components/main-button";
import FormInput from "../reusable-components/form-input";

export default function SignIn( {setCurrentPage}) {
  const submitRef = useRef(null);

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
        <FormInput title="Club Email" type="email" placeholder="MJC Club Email" autoFocus={true}></FormInput>
        <FormInput title="Club Password" type="password" placeholder="MJC Club Password"></FormInput>

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
