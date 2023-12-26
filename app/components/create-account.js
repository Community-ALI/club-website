import React, { useRef, useState } from "react";
import SectionTitle from "./section-title";
import MainButton from "./main-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ClubOptions } from "./clubs";

export default function CreateAccount() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div className="animate-componentFade">
        <SectionTitle text="Create Account"></SectionTitle>

        <form className="flex justify-center flex-col w-[950px] lg:w-[90%] md:w-[400px] xsm:w-[80%] xxsm:w-[85%] mr-auto ml-auto text-darkBlue">
          <div className="flex justify-center md:flex-col gap-[50px] md:gap-[10px]">
            <div className="w-[45%] md:w-[100%] flex flex-col justify-center items-center relative mt-[20px]">
              <p className="text-center font-[Nunito] font-[600] text-[18px] lg:text-[16px] sm:text-[14px] mb-[10px]">
                Select the Club {"You're"} Representing
              </p>
              <select
                placeholder="MJC Club Email"
                className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
         border-darkBlue font-[400] tracking-wide text-[18px]
         lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px]
         xsm:text-[13px] xxsm:text-[12px] xxsm:px-4 appearance-none"
              >
                <option disabled selected>
                  Select Your MJC Club...
                </option>
                {ClubOptions.map((club, index) => (
                  <option key={index}>{club}</option>
                ))}
                <option>Other / New Club</option>
              </select>
              <FontAwesomeIcon
                className="absolute right-[20px] top-[50px] lg:top-[46px] md:top-[42px] text-lightBlue"
                icon={faCaretDown}
                size="xl"
              />
            </div>

            <div className="flex flex-col w-[45%] md:w-[100%] justify-center items-center mt-[20px]">
              <p className="text-center font-[Nunito] font-[600] text-[18px] lg:text-[16px] sm:text-[14px] mb-[10px]">
                Enter Your Club Email
              </p>
              <input
                type="email"
                placeholder="something@(my)yosemite.edu"
                className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
         border-darkBlue font-[600] tracking-wide text-[18px]
         lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px] 
         xsm:text-[13px] xxsm:text-[12px] xxsm:px-4"
              ></input>
            </div>
          </div>

          <div className="flex justify-center gap-[50px] md:flex-col md:gap-[10px] md:mt-[10px]">
            <div className="w-[45%] md:w-[100%] flex flex-col justify-center items-center relative mt-[20px]">
              <p
                className="text-center font-[Nunito] font-[600] text-[18px] 
          mb-[10px] lg:text-[16px] sm:text-[14px]"
              >
                Create a Club Password
              </p>
              <div className="relative w-[100%] flex justify-center items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Must be at least 8 characters"
                  className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
          border-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px] 
          xsm:text-[13px] xxsm:text-[12px] xxsm:px-4"
                ></input>
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash}
                  className="cursor-pointer text-[18px] lg:text-[16px] z-10 absolute top-[18px] right-[20px] 
                  md:top-[16px] xsm:text-[16px] xsm:top-[14px] xsm:right-[20px]"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            <div className="w-[45%] md:w-[100%] flex flex-col justify-center items-center relative mt-[20px]">
              <p
                className="text-center font-[Nunito] font-[600] text-[18px] 
          mb-[10px] lg:text-[16px] sm:text-[14px]"
              >
                Confirm Club Password
              </p>
              <input
                placeholder="Must match your club password"
                type="password"
                className="w-[100%] px-8 py-3 bg-white rounded-[80px] border-2
          border-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px] 
          xsm:text-[13px] xxsm:text-[12px] xxsm:px-4"
              ></input>
            </div>
          </div>
        </form>

        <div className="flex justify-center items-center mt-[70px] md:mt-[60px] xsm:mt-[50px]">
          <MainButton text="Create Account"></MainButton>
        </div>
      </div>
    </>
  );
}
