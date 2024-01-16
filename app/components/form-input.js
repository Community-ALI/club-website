"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function FormInput({
  title = "",
  type = "text",
  placeholder = "",
  autoFocus = false,
  sideBySide = false,
  onchange = () => {},
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const [fulfilledRequirements, setFulfilledRequirements] = useState([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setFulfilledRequirements(checkPassword(password));
  }, [password]);

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
    console.log("fulfilledRequirements",_fullfilledPasswordRequirements);
    setFulfilledRequirements(_fullfilledPasswordRequirements);
    return _fullfilledPasswordRequirements;
  }
  return (
    <div
      className={
        sideBySide
          ? "flex flex-col w-[45%] md:w-[100%] justify-center items-center mt-[20px]"
          : "flex flex-col justify-center items-center mt-[20px] sm:mt-[10px]"
      }
    >
      <p className="text-center text-darkBlue font-[Nunito] font-[600] tracking-wide text-[18px] mb-[10px] xsm:text-[16px]">
        {title}
      </p>
      <div className="relative w-[100%] flex justify-center items-center">
        <input
          required
          type={type === "password" && passwordVisible ? "text" : type}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(e) => {
            onchange(e);
            if (type === "password")
              setPassword(e.target.value);
          }}
          className="w-[100%] px-8 py-3 bg-white rounded-[80px] border-2
          border-darkBlue text-darkBlue font-[600] tracking-wide text-[18px]
          lg:text-[16px] md:text-[15px] md:px-5 xsm:py-[10px]
          xsm:text-[14px] xxsm:text-[13px] xxsm:px-4"
        ></input>
        {type === "password" && (
          <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            className="cursor-pointer text-[18px] z-10 absolute top-[18px] right-[22px] xsm:text-[16px] xsm:top-[14px] xsm:right-[20px]"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {type === "password" && (
        <div>
          <p
            className={`text-center text-[12px] ${
              fulfilledRequirements[0] ? "text-lightBlue" : "text-orange"
            } mt-[5px] xsm:text-[10px]`}
          >
            Password must be at least 8 characters long.
          </p>
          <p
            className={`text-center text-[12px] ${
              fulfilledRequirements[2] ? "text-lightBlue" : "text-orange"
            } mt-[5px] xsm:text-[10px]`}
          >
            Password must contain a number.
          </p>
          <p
            className={`text-center text-[12px] ${
              fulfilledRequirements[1] ? "text-lightBlue" : "text-orange"
            } mt-[5px] xsm:text-[10px]`}
          >
            Password must contain at least one capital letter.
          </p>
        </div>
      )}
    </div>
  );
}
