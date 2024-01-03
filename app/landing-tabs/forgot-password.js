"use client";
import React, { useRef, } from "react";
import FormInput from "../reusable-components/form-input";
import SectionTitle from "../reusable-components/section-title";
import MainButton from "../reusable-components/main-button";

export default function PasswordReset() {
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
        <FormInput title="Club Email" type="email" placeholder="MJC Club Email" autoFocus={true}></FormInput>
        {/* invisible submit button */}
        <input type="submit" className="hidden" ref={submitRef}></input>
      </form>

      <div className="flex justify-center items-center mt-[40px]">
        <MainButton onClick={clickSubmit} text="Reset Password"></MainButton>
      </div>
    </div>
  );
}
