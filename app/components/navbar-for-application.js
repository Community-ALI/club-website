"use client";
import React, { Component, useState, useEffect } from "react";
import ClubAgreementPage from "../club-application/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NavItem = ({ text, onClick, closeMenu, href }) => (
  <li
    className="hover:text-orange ease-out duration-200"
    onClick={() => {
      onClick && onClick();
      closeMenu && closeMenu();
    }}
  >
    <a href={href}>{text}</a>
  </li>
);

const NavIcon = ({ href, imgSrc, imgAlt, imgWidth }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img className={imgWidth} src={imgSrc} alt={imgAlt} />
  </a>
);

export default function NavbarForApplication() {
  const [isMobile, setIsMobile] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => setOverlayVisible(!overlayVisible);
  const closeMobileMenu = () => setOverlayVisible(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [token, setToken] = useState(null);

  useEffect(() => {
    // This code runs only on the client side
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <>
      {isMobile ? (
        <nav className="bg-darkBlue relative h-[80px] xsm:h-[70px] flex justify-between items-center px-[20px]">
          <div
            className={`fixed top-0 bottom-0 z-10 bg-[#001E60]
            transition-all duration-500 ease-in-out ${
              overlayVisible ? "left-0" : "-left-[300px]"
            } w-[300px] xsm:w-[260px] xxsm:w-[230px]`}
            onClick={(e) => {
              if (e.target.classList.contains("faBars")) {
                handleIconClick();
              }
            }}
          >
            <ul
              className="flex flex-col items-center justify-center mt-[140px] gap-8
            text-offWhite cursor-pointer text-[20px] xsm:text-[18px] animate-hamburgerFade"
            >
              <NavItem
                text="Home"
                href="/#home"
                closeMenu={closeMobileMenu}
              ></NavItem>
              <NavItem
                text="Tech Support"
                href="/#techSupport"
                closeMenu={closeMobileMenu}
              ></NavItem>
              <NavItem
                text="Contact"
                href="/#contact"
                closeMenu={closeMobileMenu}
              ></NavItem>
              <a
                href="https://www.mjc.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MJC
              </a>
            </ul>
          </div>

          <div className="flex justify-between items-center relative">
            <FontAwesomeIcon
              icon={overlayVisible ? faXmark : faBars}
              className="cursor-pointer text-3xl z-10"
              color="white"
              onClick={toggleOverlay}
            />
          </div>

          <a
            className="hover:text-orange text-[white]
           hover:border-orange ease-in-out duration-300
           bg-opacity-0 font-[700]"
           href="/#signIn"
            onClick={() => {
              localStorage.removeItem("token"); // remove the token from local storage
              closeMobileMenu();
              // reload the page to update the navbar
              setToken(null);
            }}
          >
            {token ? "Sign Out" : "Sign In"}
          </a>
        </nav>
      ) : (
        <nav className="bg-darkBlue h-[100px] xlg:h-[90px] lg:h-[80px] flex justify-between items-center relative px-[40px] xlg:px-[20px]">
          <div className="flex justify-center items-center gap-6 xlg:gap-4">
            <NavIcon
              href="https://www.mjc.edu/"
              imgSrc="images/MJC.png"
              imgAlt="MJC Logo"
              imgWidth="w-[135px] mr-[20px] lg:w-[110px]"
            />
          </div>
          <ul className="flex items-center gap-10 xlg:gap-7 lg:gap-5 text-offWhite cursor-pointer lg:text-[13px] xlg:text-[15px]">
            <NavItem text="Home" href="/#home"></NavItem>
            <NavItem text="Tech Support" href="/#techSupport"></NavItem>
            <NavItem text="Contact" href="/#contact"></NavItem>
            <li
              className="hover:text-darkBlue hover:bg-orange whitespace-nowrap
           hover:border-orange ease-in-out duration-300 px-[20px] py-[5px] 
           bg-opacity-0 rounded-[20px] border-2 border-white font-[700] lg:px-[15px] lg:py-[3px]"
              onClick={() => {
                localStorage.removeItem("token"); // remove the token from local storage
                setToken(null);
              }}
            >
              <a href="/#signIn">{token ? "Sign Out" : "Sign In"}</a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
