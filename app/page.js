"use client";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Title from "./components/title";
import Deadline from "./components/deadline";
import SignIn from "./components/sign-in";
import CreateAccount from "./components/create-account";
import ContactInfo from "./components/contact-info";

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="flex flex-col min-h-screen bg-mjc bg-cover bg-no-repeat 
    bg-center w-full h-full z-[-1]">
      <Navbar setCurrentPage={setCurrentPage} />
      <Title></Title>
      <main className="flex-grow">
        {currentPage === "home" && <Home/>}
        {currentPage === "signIn" && <SignIn setCurrentPage={setCurrentPage}/>}
        {currentPage === "createAccount" && <CreateAccount setCurrentPage={setCurrentPage}/>}
        {currentPage === "contact" && <ContactInfo/>}
      </main>
      <Deadline></Deadline>
    </div>
  );
}
