"use client";
import React, { useState } from "react";
import Navbar from "./reusable-components/navbar";
import Home from "./landing-tabs/home";
import Title from "./reusable-components/title";
import Deadline from "./reusable-components/deadline";
import SignIn from "./landing-tabs/sign-in";
import CreateAccount from "./landing-tabs/create-account";
import ContactInfo from "./landing-tabs/contact-info";
import TechSupport from "./landing-tabs/tech-support";
import ForgotPassword from "./landing-tabs/forgot-password";

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
        {currentPage === "techSupport" && <TechSupport></TechSupport>}
        {currentPage === "forgotPassword" && <ForgotPassword setCurrentPage={setCurrentPage}/>}
      </main>
      <Deadline></Deadline>
    </div>
  );
}
