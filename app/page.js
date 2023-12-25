"use client"
import React, { useState } from 'react';
import Navbar from "./components/navbar";
import Home from "./components/home";
import Title from "./components/title";
import Deadline from "./components/deadline";
import SignIn from "./components/sign-in";
import CreateAccount from './components/create-account';

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <img src="images/background.png" className="absolute h-[100svh] top-0 left-0 
      w-full object-cover z-[-1]"></img>
      <Navbar setCurrentPage={setCurrentPage} />
      <Title></Title>
      {currentPage === 'home' && <Home />}
      {currentPage === 'signIn' && <SignIn setCurrentPage={setCurrentPage} />}
      {currentPage === 'createAccount' && <CreateAccount/>}
      <Deadline></Deadline>
    </>
  );
}
