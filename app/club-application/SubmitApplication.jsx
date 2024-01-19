import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import { getCompletionPercentage } from "./requiredData";
import RegistrationFilled from "./registrationFilled";
import { PDFCreationComponent, generatePDF } from "./MakePdf";

export default function SubmitApplication(props) {
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
    // check that all the fields are filled out
    if (getCompletionPercentage(club) !== 100) {
      alert("Please fill out all the required fields before submitting your application.");
      return;
    }
    // get the html for the pdf from getPDF
    const html = generatePDF();

    // send all data to the backend
    // get the club json
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form: form, html: html }),
    })
      .then((response) => {
        console.log(response);
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

  function createPdf() {
    // turn the current page into a pdf
    
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
        <a className="text-lightBlue font-[Nunito] text-[14px] underline underline-offset-4" 
         target="_blank"
         onClick={createPdf}
         >
          Click here to receive a copy
        </a>
        {/*FIXME: Make this work */}
      </div>

      {/* the form section */}
      <RegistrationFilled form={form} />

      {/* the submit button */}
      <div className="flex justify-end mt-8">
        <button
          className="rounded-full bg-lightBlue text-white font-[600] py-2 px-4 sm:px-6 md:px-8"
          onClick={finalSubmit}
        >
          Submit Club Application
        </button>
      </div>
      <PDFCreationComponent jsonObject={form}/> {/* An invisible component that creates a pdf of the current page */}
    </div>
  );
}