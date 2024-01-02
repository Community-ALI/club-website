import React, { useRef, useState } from "react";
import SectionTitle from "./section-title";
import MainButton from "./main-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ClubOptions } from "./clubs";

export default function CreateAccount( {setCurrentPage} ) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  // set up a ref for the form
  const submitRef = useRef(null);

  function submitForm(e) {
    e.preventDefault();
    // make sure the passwords match
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // make sure the password is at least 8 characters, has a Capital letter, and has a number
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
    // if all the checks pass, submit the form to the api
    // then alert the response from the api
    
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        club_name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
    });
  }

  function clickSubmit() { // this function is called when the button is clicked
    submitRef.current.click();
  }

  return (
    
    <>
      <div className="animate-componentFade">
        <SectionTitle text="Create Account"></SectionTitle>
        <form className="flex justify-center flex-col w-[950px] lg:w-[90%] md:w-[400px] xsm:w-[80%] xxsm:w-[85%] mr-auto ml-auto text-darkBlue" onSubmit={submitForm}>
          <div className="flex justify-center md:flex-col gap-[50px] md:gap-[10px]">
            <div className="w-[45%] md:w-[100%] flex flex-col justify-center items-center relative mt-[20px]">
              <p className="text-center font-[Nunito] font-[600] text-[18px] lg:text-[16px] sm:text-[14px] mb-[10px]">
                Select the Club {"You're"} Representing
              </p>
              <select
                required
                defaultValue={""}
                placeholder="MJC Club Email"
                className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
         border-darkBlue font-[400] tracking-wide text-[18px]
         lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px]
         xsm:text-[14px] xxsm:text-[12px] xxsm:px-4 appearance-none"
              >
                <option disabled value="">
                  Select Your MJC Club...
                </option>
                {ClubOptions.map((club, index) => (
                  <option key={index}>{club}</option>
                ))}
                <option>Other / New Club</option>
              </select>
              <FontAwesomeIcon
                className="absolute right-[20px] top-[50px] lg:top-[46px] sm:top-[40px] text-lightBlue"
                icon={faCaretDown}
                size="xl"
              />
            </div>

            <div className="flex flex-col w-[45%] md:w-[100%] justify-center items-center mt-[20px]">
              <p className="text-center font-[Nunito] font-[600] text-[18px] lg:text-[16px] sm:text-[14px] mb-[10px]">
                Enter Your Club Email
              </p>
              <input
                required
                type="email"
                placeholder="something@(my)yosemite.edu"
                className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
         border-darkBlue font-[600] tracking-wide text-[18px]
         lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px] 
         xsm:text-[13px] xxsm:text-[12px] xxsm:px-4"
              ></input>
            </div>
          </div>

          <div className="flex justify-center gap-[50px] mt-[15px] md:mt-[10px] md:flex-col md:gap-[10px]">
            <div className="w-[45%] md:w-[100%] flex flex-col justify-center items-center relative mt-[20px]">
              <p
                className="text-center font-[Nunito] font-[600] text-[18px] 
          mb-[10px] lg:text-[16px] sm:text-[14px]"
              >
                Create a Club Password
              </p>
              <div className="relative w-[100%] flex justify-center items-center">
                <input
                  required
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Must be at least 8 characters"
                  className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
          border-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px] 
          xsm:text-[14px] xxsm:text-[12px] xxsm:px-4"
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
                required
                placeholder="Must match your club password"
                type="password"
                className="w-[100%] px-6 py-3 bg-white rounded-[80px] border-2
          border-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[14px] md:px-5 sm:py-[10px] 
          xsm:text-[14px] xxsm:text-[12px] xxsm:px-4"
              ></input>
              <input type="submit" className="hidden" ref={submitRef}></input> {/* this is the hidden submit button */}
            </div>
          </div>

          <div className="flex justify-center mt-[30px] sm:mt-[20px] font-[Nunito] text-lightBlue underline underline-offset-4">
            <p className="px-[10px] md:text-[14px] sm:px-[5px] xxsm:text-[12px] cursor-pointer hover:text-darkBlue duration-200 ease"
            onClick={() => setCurrentPage('signIn')}
            >Already Have an Account? Sign In</p>
        </div>
        </form>

        <div className="flex justify-center items-center mt-[40px] md:mt-[30px]">
          {/* when clicked, trigger the form to submit */}
          <MainButton onClick={clickSubmit} text="Create Account"></MainButton>
        </div>
      </div>
    </>
  );
}
