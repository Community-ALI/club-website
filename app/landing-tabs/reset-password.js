"use client";
import React, { useRef, } from "react";
import FormInput from "../reusable-components/form-input";
import SectionTitle from "../reusable-components/section-title";
import MainButton from "../reusable-components/main-button";

export default function PasswordReset() {
    function submitForm(e) {
        e.preventDefault();
        // ensure the password and confirm password fields match
        const password = e.target[0].value;
        const confirmPassword = e.target[1].value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
          }
          // make sure the password is at least 8 characters, has a capital letter, and has a number
          if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
          }
          if (!password.match(/[A-Z]/)) {
            alert("Password must contain at least one capital letter");
            return;
          }
          if (!password.match(/[0-9]/)) {
            alert("Password must contain at least one number");
            return;
          }
          // if all the checks pass, submit the new password to the api, along with the email and token from the url
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            const email = urlParams.get("email");
            fetch("/api/auth/reset-password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                token: token,
                password: password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                alert(data.message);
                // if the password was reset successfully, redirect to the sign in page
                if (data.message === "Password Reset") {
                  window.location.href = "/sign-in";
                }
            });
        }


  return (
    <div className="animate-componentFade">
      <SectionTitle text="Password Reset"></SectionTitle>

      <form className="flex justify-center flex-col w-[450px] lg:w-[400px] md:w-[350px] xsm:w-[80%] mr-auto ml-auto" onSubmit={submitForm}>
      <form className="flex justify-center flex-col w-[450px] lg:w-[400px] md:w-[350px] xsm:w-[80%] mr-auto ml-auto">
            <FormInput title="New Password" type="password" placeholder="New Password" autoFocus={true}></FormInput>
            <FormInput title="Confirm Password" type="password" placeholder="Confirm Password"></FormInput>
            <div className="flex justify-center items-center mt-[40px]">
              <MainButton text="Reset Password"></MainButton>
            </div>
        </form>
      </form>
    </div>
  );
}
