'use client';
import React, { useState, useEffect } from "react";
import Navbar from "./reusable-components/navbar";
import Home from "./landing-tabs/home";
import Title from "./reusable-components/title";
import Deadline from "./reusable-components/deadline";
import SignIn from "./landing-tabs/sign-in";
import CreateAccount from "./landing-tabs/create-account";
import ContactInfo from "./landing-tabs/contact-info";
import TechSupport from "./landing-tabs/tech-support";
import ForgotPassword from "./landing-tabs/forgot-password";
import ResetPassword from "./landing-tabs/reset-password";

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState("");

  // Function to update the current page and the URL hash
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.location.hash = newPage;
  };

  // Effect to handle URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "") setCurrentPage("home");
    else
    if (hash) setCurrentPage(hash);
  }, []);

  // Effect to handle URL hash change
  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      setCurrentPage(newHash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-mjc bg-cover bg-no-repeat 
    bg-center w-full h-full z-[-1]">
      <Navbar setCurrentPage={handlePageChange} />
      <Title></Title>
      <main className="flex-grow">
        {currentPage === "home" && <Home />}
        {currentPage === "signIn" && <SignIn setCurrentPage={handlePageChange} />}
        {currentPage === "createAccount" && <CreateAccount setCurrentPage={handlePageChange} />}
        {currentPage === "contact" && <ContactInfo />}
        {currentPage === "techSupport" && <TechSupport />}
        {currentPage === "forgotPassword" && <ForgotPassword setCurrentPage={handlePageChange} />}
        {currentPage === "resetPassword" && <ResetPassword setCurrentPage={handlePageChange} />}
      </main>
      <Deadline></Deadline>
    </div>
  );
}
