import React, { useState, useEffect } from "react";
import MainButton from "../components/main-button";
import SectionTitle from "../components/section-title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

function Overlay({ onClose }) {
  const handleOverlayClose = () => {
    onClose();
  };

  return (
    <>
      <div
        className="bg-[#000000] opacity-50 absolute top-0 left-0 right-0 
      h-full w-full"
        onClick={handleOverlayClose}
      ></div>
      <div
        className="bg-offWhite h-[320px] sm:h-[300px] w-[540px] lg:w-[450px] sm:w-[80%] xsm:w-[90%] absolute top-1/2
        left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-[10px] left-[10px] text-[20px] cursor-pointer text-darkBlue"
          onClick={handleOverlayClose}
        ></FontAwesomeIcon>
        <h1 className="text-center text-darkBlue text-[28px] lg:text-[26px] sm:text-[24px] xxsm:text-[20px] 
        animate-hamburgerFade mt-2 sm:mt-3">
          {"Let's"} Get Started
        </h1>
        <h2 className="text-center text-lightBlue text-[18px] lg:text-[16px] sm:text-[15px] mt-2 animate-hamburgerFade">
          Select the Status of Your Club
        </h2>
        <div className="flex items-center justify-center mt-5 gap-5 animate-hamburgerFade">
          <a href="/club-application">
            <div className="flex flex-col hover:bg-veryLightGray p-5 sm:p-4 xsm:p-3 cursor-pointer rounded-md duration-200 ease-in">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="text-[25px] sm:text-[23px] text-darkBlue"
              ></FontAwesomeIcon>
              <p className="font-[Nunito] text-darkBlue font-[700] mt-2 sm:text-[15px] xsm:text-[14px] xxsm:text-[13px] whitespace-nowrap">
                Brand New Club
              </p>
            </div>
          </a>
          <a href="/#signIn">
            <div className="flex flex-col hover:bg-veryLightGray p-5 sm:p-4 xsm:p-3 cursor-pointer rounded-md duration-200 ease-in">
              <FontAwesomeIcon
                icon={faRotate}
                className="text-[25px] sm:text-[23px] text-darkBlue"
              ></FontAwesomeIcon>
              <p className="font-[Nunito] text-darkBlue font-[700] mt-2 sm:text-[15px] xsm:text-[14px] xxsm:text-[13px] whitespace-nowrap">
                Returning Club
              </p>
            </div>
          </a>
        </div>
        <a href="/#contact">
          <p
            className="text-center font-[Nunito] text-[14px] lg:text-[13px] text-lightBlue 
        underline underline-offset-4 mt-8 lg:mt-[45px] sm:mt-[40px] xsm:mt-[35px] cursor-pointer
        hover:text-darkBlue duration-100"
          >
            Not sure? Click here for contact info.
          </p>
        </a>
      </div>
    </>
  );
}

export default function Home() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const handleStartApplicationClick = () => {
    setOverlayVisible(true);
  };
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <div className="animate-componentFade">
      <SectionTitle text="Club Application"></SectionTitle>
      <p
        className="text-darkBlue text-center font-[Nunito] font-[600] w-[540px] 
        lg:w-[500px] md:w-[380px] mr-auto ml-auto mt-[30px] md:text-[14px] 
        sm:text-[13px] xxsm:text-[12px] xsm:w-[340px] xxsm:w-[300px]"
      >
        Facilitating club success is the highest priority for Campus Life &
        Student Learning. With many clubs taking part in hundreds of activities
        each year, it is important that each club understands and knows what is
        required to hold meetings, use funds, and host events that are all
        within the rules of the district and the college. Campus Life serves as
        the process center to many policies and procedures that are a part of
        YCCD, MJC Business Services, MJC Facilities, and MJC Media Services. All
        of these departments play a key role in booking a room and hosting a
        campus event.
      </p>
      <div className="flex justify-center items-center mt-[80px] lg:mt-[60px] xsm:mt-[40px]">
        <a onClick={handleStartApplicationClick} className="w-[100%] mx-auto text-center">
          <MainButton text="Start Application"></MainButton>
        </a>
      </div>

      {isOverlayVisible && <Overlay onClose={handleCloseOverlay} />}
    </div>
  );
}
