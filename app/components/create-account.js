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

        <form className="flex justify-center flex-col">
          <div className="flex justify-center gap-[50px]">
            <div className="flex flex-col justify-center items-center mt-[20px] sm:mt-[10px] relative">
              <p className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] mb-[10px] xsm:text-[16px]">
                Select the Club You're Representing
              </p>
              <select
                placeholder="MJC Club Email"
                className="w-[420px] px-6 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[400] tracking-wide text-[18px]
         lg:w-[400px] lg:text-[16px] md:w-[350px] md:text-[15px] md:px-5 xsm:py-[10px] 
         xsm:text-[14px] xsm:w-[80%] xxsm:text-[13px] xxsm:px-4 appearance-none"
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
                className="absolute right-[20px] top-[50px] text-lightBlue"
                icon={faCaretDown}
                size="xl"
              />
            </div>

            <div className="flex flex-col justify-center items-center mt-[20px] sm:mt-[10px]">
              <p className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] mb-[10px] xsm:text-[16px]">
                Enter Your Club Email
              </p>
              <input
                type="email"
                placeholder="something@(my)yosemite.edu"
                className="w-[420px] px-6 py-3 bg-white rounded-[80px] border-2
         border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
         lg:w-[400px] lg:text-[16px] md:w-[350px] md:text-[15px] md:px-5 xsm:py-[10px] 
         xsm:text-[14px] xsm:w-[80%] xxsm:text-[13px] xxsm:px-4"
              ></input>
            </div>
          </div>

          <div className="flex justify-center gap-[50px]">
            <div className="flex flex-col justify-center items-center mt-[10px] relative">
              <p
                className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] 
          mb-[10px] mt-[20px] xsm:text-[16px]"
              >
                Create a Club Password
              </p>
              <div className="relative w-[420px] lg:w-[400px] md:w-[350px] xsm:w-[80%] flex justify-center items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Must be at least 8 characters"
                  className="w-[420px] px-6 py-3 bg-white rounded-[80px] border-2
          border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px] 
          xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
                ></input>
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash}
                  className="cursor-pointer text-[18px] z-10 absolute top-[18px] right-[20px] xsm:text-[16px] xsm:top-[14px] xsm:right-[20px]"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-[10px] relative">
              <p
                className="text-center text-darkBlue font-[Nunito] font-[600] text-[18px] 
          mb-[10px] mt-[20px] xsm:text-[16px]"
              >
                Confirm Club Password
              </p>
              <input
                placeholder="Must match your club password"
                type="password"
                className="px-8 py-3 bg-white rounded-[80px] border-2
          border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px] 
          xsm:text-[14px] xxsm:text-[13px] xxsm:px-4 w-[420px] lg:w-[400px] md:w-[350px] xsm:w-[80%]"
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
