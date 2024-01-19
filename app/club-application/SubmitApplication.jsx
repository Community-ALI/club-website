import React, { useState } from "react";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import { getCompletionPercentage } from "./requiredData";
import RegistrationFilled from "./registrationFilled";
import { PDFCreationComponent, generatePDF } from "./MakePdf";
import { getToken } from "../components/getToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function SubmitApplication(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const handleStartApplicationClick = () => {
    setOverlayVisible(true);
  };
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };
  // to prevent multiple submissions
  const [submitted, setSubmitted] = useState(false);
  const { club } = props;
  // turn the club into a form
  const clubInformation = club.clubInformation;
  let clubAdvisors = club.clubAdvisors;
  // only get the name, email, and phone number
  clubAdvisors = clubAdvisors.map((advisor) => {
    return {
      name: advisor.name,
      email: advisor.email,
      phoneNumber: advisor.phoneNumber,
      title: advisor.employeeTitle,
    };
  });
  let clubOfficers = club.clubOfficers;
  // only get the role, name, email, wNumber, phoneNumber, major, and gradeLevel
  // remove any officers that are not used

  clubOfficers = clubOfficers.map((officer) => {
    if (!officer.isRequired && !officer.isUsed) {
      return {
        role: officer.role,
        placeholder: `This club does not have a ${officer.role}`
      };
    }
    return {
      role: officer.role,
      name: officer.name,
      email: officer.email,
      wNumber: officer.wNumber,
      phoneNumber: officer.phoneNumber,
      major: officer.major,
      gradeLevel: officer.gradeLevel,
    };
  });

  let clubMembers = club.clubMembers;
  // only get the name, email, and wNumber
  clubMembers = clubMembers.map((member) => {
    return {
      name: member.name,
      email: member.email,
      wNumber: member.wNumber,
    };
  });
  
  const clubAgreement = club.clubAgreement;
  let form = {
    clubInformation: clubInformation,
    clubAdvisors: clubAdvisors,
    clubOfficers: clubOfficers,
    clubMembers: clubMembers,  
    clubAgreement: clubAgreement,
  }

  function finalSubmit() {
    console.log("final submit");
    // prevent multiple submissions
    if (submitted) {
      return;
    }
    setSubmitted(true);
    // check that all the fields are filled out
    if (getCompletionPercentage(club) === 100) {
      setOverlayVisible(true);
    } else {
      alert("Please fill out all the required fields before submitting your application.");
    }
  };
    // get the html for the pdf from getPDF
    const html = generatePDF();
    const token = getToken();
    // send all data to the backend
    // get the club json
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ form: form, html: html }),
    })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        if (response.status === 200) {
          alert("Your application has been submitted successfully.");
          window.location.href = "/";
        } else {
          alert("There was an error submitting your application. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting your application. Please try again.");
      });
  }

  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };
  
  function handleSubmitAndClose() {
    handleOverlayClose();
    finalSubmit();
  }

  function createPdf() {
    // turn the current page into a pdf
  }

  function SubmitOverlay({ onClose }) {
  const handleOverlayClose = () => {
    onClose();
  };
  
  return (
    <>
      <div
        className="bg-[#000000] opacity-50 fixed top-0 left-0 right-0 
      h-full w-full z-[20]"
        onClick={handleOverlayClose}
      ></div>
      <div
        className="bg-offWhite h-[320px] sm:h-[300px] w-[540px] lg:w-[450px] sm:w-[80%] xsm:w-[90%] fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg z-[20]"
      >
        <h1 className="text-center text-darkBlue text-[28px] lg:text-[26px] sm:text-[24px] xxsm:text-[20px] 
        animate-hamburgerFade mt-2 sm:mt-3">
          Ready for takeoff
        </h1>
        <h2 className="text-center text-lightBlue text-[18px] lg:text-[16px] sm:text-[15px] mt-2 animate-hamburgerFade">
          Do You Want to Submit This Application?
        </h2>
        <div className="flex items-center justify-center mt-5 gap-7 animate-hamburgerFade">
          <a onClick={handleSubmitAndClose}>
            <div className="flex flex-col hover:bg-veryLightGray p-5 sm:p-4 xsm:p-3 cursor-pointer rounded-md duration-200 ease-in">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-[25px] sm:text-[23px] text-[#009c0d]"
              ></FontAwesomeIcon>
              <p className="font-[Nunito] text-darkBlue font-[700] mt-2 sm:text-[15px] xsm:text-[14px] xxsm:text-[13px] whitespace-nowrap">
                Yes, {"I'm"} done
              </p>
            </div>
          </a>
          <a onClick={handleOverlayClose}>
            <div className="flex flex-col hover:bg-veryLightGray p-5 sm:p-4 xsm:p-3 cursor-pointer rounded-md duration-200 ease-in">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-[25px] sm:text-[23px] text-[#ff0000]"
              ></FontAwesomeIcon>
              <p className="font-[Nunito] text-darkBlue font-[700] mt-2 sm:text-[15px] xsm:text-[14px] xxsm:text-[13px] whitespace-nowrap">
                No, not yet
              </p>
            </div>
          </a>
        </div>
          <p
            className="text-center font-[Nunito] text-[14px] lg:text-[13px] text-lightBlue 
        mt-8 lg:mt-[45px] sm:mt-[40px] xsm:mt-[35px] cursor-pointer
        hover:text-darkBlue duration-100"
          >
            Facing issues? Email: communityalis@gmail.com
          </p>
      </div>
    </>
  );
}

  return (
    <div className="px-12 py-12 md:px-[30px] xsm:px-[20px]">
      <ClubApplicationHeaderSection title="SUBMIT APPLICATION" />
      <p className="font-[Nunito] text-[15px] sm:text-[14px] xxsm:text-[13px] mt-[20px] mb-[30px] px-3">
        Before you submit your application, please take a moment to carefully
        review all the information you have provided. Make sure that every
        detail is accurate and complete, as you will not be able to make any
        edits once the application is submitted. Checking for typos and
        incorrect data can help prevent any delays or issues with the processing
        of your application.{" "}
      </p>
      <hr />
      <div className="flex justify-between my-8 gap-x-8 sm:flex-col gap-y-4">
        <h2>FOR SPRING SEMESTER 2024</h2>
        {/* <a className="text-lightBlue font-[Nunito] text-[14px] underline underline-offset-4" 
         target="_blank"
         onClick={createPdf}
         >
          Click here to receive a copy
        </a> */}
        {/*FIXME: Make this work */}
      </div>

      {/* the form section */}
      <RegistrationFilled form={form} />

      {/* the submit button */}
      <div className="flex justify-end mt-8">
        <button
          className="bg-lightBlue text-white border-none hover:bg-darkBlue tracking-widest text-[12px] xsm:text-[11px] 
          px-8 xsm:px-6 py-3 rounded-full duration-200 ease"
          onClick={handleStartApplicationClick}
          // onClick={finalSubmit}
        >
          Submit Club Application
        </button>
      </div>
      <PDFCreationComponent jsonObject={form}/> {/* An invisible component that creates a pdf of the current page */}

      {isOverlayVisible && <SubmitOverlay onClose={handleCloseOverlay} />}

      {isLoading && (
          <div className="fixed inset-0 animate-loadingFade z-[100] bg-offWhite bg-opacity-50 top-0 left-0 right-0 
          h-full w-full flex items-center justify-center">
            <p className="text-darkBlue text-center font-Nunito font-semibold ml-4">
              Submitting...
            </p>
          </div>
        )}
    </div>
  );
}