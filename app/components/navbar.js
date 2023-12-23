"use client";
import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const NavItem = ({ text }) => (
    <li className="hover:text-orange ease-out duration-200">{text}</li>
  );

  const NavIcon = ({ href, imgSrc, imgAlt, imgWidth }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img className={imgWidth} src={imgSrc} alt={imgAlt} />
    </a>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <nav className="bg-darkBlue relative h-[80px] flex justify-between items-center px-[20px]">
          <img
            className="absolute left-1/2 top-[20%] transform -translate-x-1/2 w-[100px] z-10"
            src="images/ASMJC.png"
            alt="ASMJC Logo"
          ></img>
          <div
            className={`fixed inset-0 z-10 ${
              overlayVisible ? "bg-[#001E60] bg-opacity-[90%]" : "hidden"
            }`}
            onClick={(e) => {
              if (e.target.classList.contains("faBars")) {
                handleIconClick();
              }
            }}
          >
            <ul
              className="flex flex-col items-center justify-center mt-[100px] gap-8
            text-offWhite cursor-pointer text-[20px] animate-hamburgerFade"
            >
              <NavItem text="Home"></NavItem>
              <NavItem text="Tech Support"></NavItem>
              <NavItem text="Contact"></NavItem>
              <a
                href="https://www.mjc.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MJC
              </a>

              <div className="flex justify-center items-center gap-7 mt-5">
                <NavIcon
                  href="https://www.youtube.com/@mjccampuslifestudentlearni6266/featured"
                  imgSrc="images/Youtube.png"
                  imgAlt="Youtube Logo"
                  imgWidth="w-[30px] lg:w-[25px]"
                />
                <NavIcon
                  href="https://www.facebook.com/modestojuniorcollege"
                  imgSrc="images/Facebook.png"
                  imgAlt="Facebook Logo"
                  imgWidth="w-[22px] lg:w-[20px]"
                />
                <NavIcon
                  href="https://www.instagram.com/mjccampuslife/"
                  imgSrc="images/Instagram.png"
                  imgAlt="Instagram Logo"
                  imgWidth="w-[22px] lg:w-[20px]"
                />
                <NavIcon
                  href="https://www.linkedin.com/school/modesto-junior-college/mycompany/"
                  imgSrc="images/Linkedin.png"
                  imgAlt="Linkedin Logo"
                  imgWidth="w-[22px] lg:w-[20px]"
                />
              </div>
            </ul>
          </div>

          <div className="flex justify-between items-center relative">
            {overlayVisible ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-3xl z-10"
                color="white"
                onClick={() => setOverlayVisible(!overlayVisible)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="cursor-pointer text-3xl z-10"
                color="white"
                onClick={() => setOverlayVisible(!overlayVisible)}
              />
            )}
          </div>

          <button
            className="hover:text-orange text-[white]
           hover:border-orange ease-in-out duration-300
           bg-opacity-0 font-[700]"
          >
            Sign In
          </button>
        </nav>
      ) : (
        <nav className="bg-darkBlue h-[100px] lg:h-[90px] flex justify-between items-center relative px-[40px] lg:px-[20px]">
          <div className="flex justify-center items-center gap-6 xlg:gap-4">
            <NavIcon
              href="https://www.mjc.edu/"
              imgSrc="images/MJC.png"
              imgAlt="MJC Logo"
              imgWidth="w-[135px] mr-[20px] lg:w-[110px]"
            />
            <NavIcon
              href="https://www.youtube.com/@mjccampuslifestudentlearni6266/featured"
              imgSrc="images/Youtube.png"
              imgAlt="Youtube Logo"
              imgWidth="w-[30px] lg:w-[25px]"
            />
            <NavIcon
              href="https://www.facebook.com/modestojuniorcollege"
              imgSrc="images/Facebook.png"
              imgAlt="Facebook Logo"
              imgWidth="w-[22px] lg:w-[20px]"
            />
            <NavIcon
              href="https://www.instagram.com/mjccampuslife/"
              imgSrc="images/Instagram.png"
              imgAlt="Instagram Logo"
              imgWidth="w-[22px] lg:w-[20px]"
            />
            <NavIcon
              href="https://www.linkedin.com/school/modesto-junior-college/mycompany/"
              imgSrc="images/Linkedin.png"
              imgAlt="Linkedin Logo"
              imgWidth="w-[22px] lg:w-[20px]"
            />
          </div>

          <img
            className="absolute left-1/2 top-1/4 transform -translate-x-1/2 w-[150px] xlg:w-[120px] lg:w-[110px]"
            src="images/ASMJC.png"
            alt="ASMJC Logo"
          ></img>
          <ul className="flex items-center gap-10 xlg:gap-7 lg:gap-5 text-offWhite cursor-pointer lg:text-[13px] xlg:text-[15px]">
            <NavItem text="Home"></NavItem>
            <NavItem text="Tech Support"></NavItem>
            <NavItem text="Contact"></NavItem>
            <li
              className="hover:text-darkBlue hover:bg-orange
           hover:border-orange ease-in-out duration-300 px-[20px] py-[5px] 
           bg-opacity-0 rounded-[20px] border-2 border-white font-[700] lg:px-[15px] lg:py-[3px]"
            >
              Sign In
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
