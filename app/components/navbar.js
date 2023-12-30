"use client";
import React, { Component, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NavItem = ({ text, onClick, closeMenu}) => (
  <li className="hover:text-orange ease-out duration-200" onClick={() => { onClick && onClick(); closeMenu && closeMenu(); }}>{text}</li>
);

const NavIcon = ({ href, imgSrc, imgAlt, imgWidth }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img className={imgWidth} src={imgSrc} alt={imgAlt} />
  </a>
);

export default function Navbar({ setCurrentPage }) {
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

  return (
    <>
      {isMobile ? (
        <nav className="bg-darkBlue relative h-[80px] xsm:h-[70px] flex justify-between items-center px-[20px]">
          <img
            className="absolute left-1/2 top-[20%] transform -translate-x-1/2 w-[100px] z-20 xsm:w-[90px]"
            src="images/ASMJC.png"
            alt="ASMJC Logo"
          ></img>
          <div
            className={`fixed top-0 bottom-0 z-10 bg-[#001E60]
            transition-all duration-500 ease-in-out ${overlayVisible ? 'left-0' : '-left-[300px]'} w-[300px] xsm:w-[260px] xxsm:w-[230px]`}
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
              <NavItem text="Home" onClick={() => setCurrentPage('home')} closeMenu={closeMobileMenu}></NavItem>
              <NavItem text="Tech Support" onClick={() => setCurrentPage('techSupport')} closeMenu={closeMobileMenu}></NavItem>
              <NavItem text="Contact" onClick={() => setCurrentPage('contact')} closeMenu={closeMobileMenu}></NavItem>
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
            <FontAwesomeIcon
              icon={overlayVisible ? faXmark : faBars}
              className="cursor-pointer text-3xl z-10"
              color="white"
              onClick={toggleOverlay}
            />
          </div>

          <div
            className="hover:text-orange text-[white]
           hover:border-orange ease-in-out duration-300
           bg-opacity-0 font-[700]"
           onClick={() => {
            setCurrentPage('signIn');
            closeMobileMenu();
          }}
          >
            Sign In
          </div>
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
            className="absolute left-1/2 top-[18%] transform -translate-x-1/2 w-[120px] lg:w-[110px] z-12"
            src="images/ASMJC.png"
            alt="ASMJC Logo"
          ></img>
          <ul className="flex items-center gap-10 xlg:gap-7 lg:gap-5 text-offWhite cursor-pointer lg:text-[13px] xlg:text-[15px]">
            <NavItem text="Home" onClick={() => setCurrentPage('home')}></NavItem>
            <NavItem text="Tech Support" onClick={() => setCurrentPage('techSupport')}></NavItem>
            <NavItem text="Contact" onClick={() => setCurrentPage('contact')}></NavItem>
            <li
              className="hover:text-darkBlue hover:bg-orange whitespace-nowrap
           hover:border-orange ease-in-out duration-300 px-[20px] py-[5px] 
           bg-opacity-0 rounded-[20px] border-2 border-white font-[700] lg:px-[15px] lg:py-[3px]"
           onClick={() => setCurrentPage('signIn')}>
              Sign In
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}