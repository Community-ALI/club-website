"use client"
import React, { useState } from 'react';
import Navbar from "./components/navbar";
import Home from "./components/home";
import Title from "./components/title";
import Deadline from "./components/deadline";
import SignIn from "./components/sign-in";
import { Pages } from './utils.js/constants';

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState('home');

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case Pages.HOME:
  //       return <Home/>;
  //     case Pages.SIGN_IN:
  //       return <SignIn/>;
  //     default:
  //       return <Home/>;
  //   }
  // };

  return (
    <>
      <img src="images/background.png" className="absolute h-[100svh] top-0 left-0 
      w-full object-cover z-[-1]"></img>
      <Navbar setCurrentPage={setCurrentPage} />
      <Title></Title>
      {currentPage === 'home' && <Home />}
      {currentPage === 'signIn' && <SignIn />}
      {/* {renderPage()} */}
      <Deadline></Deadline>
    </>
  );
}
