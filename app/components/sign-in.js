"use client"
import React, { useRef } from 'react';
import SectionTitle from "./section-title";
import MainButton from "./main-button";

export default function SignIn() {

  // When enter is pressed on the email input field, 
  // the password input field is automatically selected.
  const passwordRef = useRef(null);

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      passwordRef.current.focus();
    }
  };

  return (
    <div className='animate-componentFade'>
      <SectionTitle text="Club Sign In"></SectionTitle>

      <form className="flex justify-center flex-col">
        <div className="flex flex-col justify-center items-center mt-[20px]">
          <p className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] mb-[10px]">
            MJC Club Email
          </p>
          <input
            type="email"
            placeholder="MJC Club Email"
            onKeyPress={handleEnterKeyPress}
            autoFocus
            className="w-[450px] px-8 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]"
          ></input>
        </div>

        <div className="flex flex-col justify-center items-center mt-[10px]">
          <p className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] mb-[10px] mt-[20px]">
            MJC Club Password
          </p>
          <input
            type="password"
            placeholder="MJC Club Password"
            ref={passwordRef}
            className="w-[450px] px-8 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]"
          ></input>
        </div>
      </form>

      <div className="flex justify-center items-center mt-[70px] md:mt-[60px] xsm:mt-[40px]">
        <MainButton text="Sign In"></MainButton>
      </div>
    </div>
  );
}
