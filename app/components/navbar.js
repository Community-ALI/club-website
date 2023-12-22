import React from 'react';

const NavItem = ({ text }) => (
  <li className="hover:text-orange ease-out duration-200">{text}</li>
);

const NavIcon = ({ href, imgSrc, imgAlt, imgWidth }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img className={imgWidth} src={imgSrc} alt={imgAlt} />
  </a>
);

export default function Navbar() {
  return (
    <>
      <nav className="bg-darkBlue h-[110px] flex justify-between items-center relative px-[40px] lg:px-[20px]">
        <div className="flex justify-center items-center gap-6 xlg:gap-4">
          <NavIcon href="https://www.mjc.edu/" imgSrc="images/MJC.png" imgAlt="MJC Logo" imgWidth="w-[135px] mr-[20px] lg:w-[110px]" />
          <NavIcon href="https://www.youtube.com/@mjccampuslifestudentlearni6266/featured" imgSrc="images/Youtube.png" imgAlt="Youtube Logo" imgWidth="w-[30px] lg:w-[25px]" />
          <NavIcon href="https://www.facebook.com/modestojuniorcollege" imgSrc="images/Facebook.png" imgAlt="Facebook Logo" imgWidth="w-[22px] lg:w-[20px]" />
          <NavIcon href="https://www.instagram.com/mjccampuslife/" imgSrc="images/Instagram.png" imgAlt="Instagram Logo" imgWidth="w-[22px] lg:w-[20px]" />
          <NavIcon href="https://www.linkedin.com/school/modesto-junior-college/mycompany/" imgSrc="images/Linkedin.png" imgAlt="Linkedin Logo" imgWidth="w-[22px] lg:w-[20px]" />
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
    </>
  );
}
