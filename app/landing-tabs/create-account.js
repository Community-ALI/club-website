import React, { useRef, useEffect, useState } from "react";
import SectionTitle from "../components/section-title";
import MainButton from "../components/main-button";
import FormInput from "../components/form-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ClubOptions } from "./clubs";

export default function CreateAccount({ setCurrentPage }) {
  // set up a ref for the form
  const submitRef = useRef(null);
  const [passwordRequriments, setPasswordRequirements] = useState([
    "Password must be at least 6 characters long",
    "Password must contain at least one capital letter",
    "Password must contain at least one number",
  ]);
  const [fullfilledPasswordRequirements, setFullfilledPasswordRequirements] =
    useState([false, false, false, false]);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let _isFormFilled = true;
    let inputs = document.getElementsByTagName("input");
    // console.log(password, confirmPassword);
    let _fullfilledPasswordRequirements = checkPassword(
      password,
      confirmPassword
    );
    for (let i = 0; i < _fullfilledPasswordRequirements.length; i++) {
      if (!_fullfilledPasswordRequirements[i]) {
        _isFormFilled = false;
      }
    }

    setIsFormFilled(_isFormFilled);


  function checkPassword(password, confirmPassword) {
    let _fullfilledPasswordRequirements = [true, true, true, true];

    if (password.length < 8) {
      _fullfilledPasswordRequirements[0] = false;
    }

    if (!password.match(/[A-Z]/)) {
      _fullfilledPasswordRequirements[1] = false;
    }

    if (!password.match(/[0-9]/)) {
      _fullfilledPasswordRequirements[2] = false;
    }
    if (password !== confirmPassword) {
      _fullfilledPasswordRequirements[3] = false;
    }
    // console.log(_fullfilledPasswordRequirements);
    setFullfilledPasswordRequirements(_fullfilledPasswordRequirements);
    return _fullfilledPasswordRequirements;
  }
  }, [password, confirmPassword]);


  function submitForm(e) {
    e.preventDefault();
    // make sure the passwords match
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
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

    // if all the checks pass, submit the form to the api

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
        // if the account was created successfully, redirect to the sign in page
        if (data.message === "Account Created") {
          setCurrentPage("signIn");
        }
      });
  }

  function clickSubmit() {
    // this function is called when the button is clicked
    submitRef.current.click();
  }

  return (
    <>
      <div className="animate-componentFade">
        <SectionTitle text="Create Account"></SectionTitle>
        {/* flex justify-center flex-col w-[450px] lg:w-[400px] md:w-[350px] xsm:w-[80%] mr-auto ml-auto */}
        <form
          className="flex justify-center flex-col w-[950px] lg:w-[90%] md:w-[400px] xsm:w-[80%] xxsm:w-[85%] mr-auto ml-auto text-darkBlue"
          onSubmit={submitForm}
        >
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

            <FormInput
              title="Club Email"
              type="email"
              placeholder="MJC Club Email"
              autoFocus={true}
              sideBySide
            ></FormInput>
          </div>
          <div className="flex justify-center gap-[50px] mt-[15px] md:mt-[10px] md:flex-col md:gap-[10px]">
              <FormInput
                title="Club Password"
                type="password"
                placeholder="MJC Club Password"
                onchange={(e) => {
                  setPassword(e.target.value);
                }}
                sideBySide
              ></FormInput>
            <FormInput
              title="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              onchange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              sideBySide
            ></FormInput>
          </div>
          <input type="submit" className="hidden" ref={submitRef}></input>{" "}
          {/* this is the hidden submit button */}
          <div className="flex justify-center mt-[30px] sm:mt-[20px] font-[Nunito] text-lightBlue underline underline-offset-4">
            <p
              className="px-[10px] md:text-[14px] sm:px-[5px] xxsm:text-[12px] cursor-pointer hover:text-darkBlue duration-200 ease"
              onClick={() => setCurrentPage("signIn")}
            >
              Already Have an Account? Sign In
            </p>
          </div>
        </form>

        <div className="flex items-center flex-col mt-[40px] md:mt-[30px]">
          {/* when clicked, trigger the form to submit */}
          <MainButton
            isDisabled={!isFormFilled}
            onClick={clickSubmit}
            text="Create Account"
          ></MainButton>

<p
            className={`text-center text-[12px] ${
              fullfilledPasswordRequirements[3] ? "text-lightBlue" : "text-orange"
            } mt-[5px] xsm:text-[10px]`}
          >
            Passwords match
          </p>
        </div>
      </div>
    </>
  );
}
