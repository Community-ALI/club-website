"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import ClubInformation from "./ClubInformation";
import ClubAdvisors from "./ClubAdvisors";
import ClubOfficers from "./ClubOfficersSection";
import ClubMembers from "./ClubMembers";
import ClubAgreemet from "./ClubAgreement"; 
import SubmitApplication from "./SubmitApplication";
import NavbarForApplication from "../components/navbar-for-application";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle} from "@fortawesome/free-solid-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { ClubApplication } from "./ApplicationClass";
import {updateCompletionPercentage} from "./requiredData";
import {getToken, setToken} from '../components/getToken';
import LoadingPage from "./Loading";


function SectionButton(props) {
  const { section, index, currentSection, handleSectionClick } = props;
  const bgColor = index != 5 ? "bg-veryLightGray" : "bg-white";
  const selectionColor =
    index != 5 ? "bg-lightGray" : "bg-lightBlue";
    const isSubmitApplication =
                  section.title === "SUBMIT APPLICATION" &&
                  index === currentSection;
                const textColor = isSubmitApplication
                  ? "text-offWhite"
                  : "text-lightBlue";
  return (
    <button
      className={`hover:cursor-pointer h-[55px] w-full border-t-darkGray border-t-[1px] flex items-center ${
        currentSection !== index ? bgColor : selectionColor
      }`}
      key={index}
      onClick={() => handleSectionClick(index)}>
      <h1 className={`pl-6 text-left ${textColor}`}>{section.title}</h1>
      {/* if the progress is 0 the checkmark is invisible, if between 1-99 it is yellow, if 100 it is green */}
      {/* also it is a full circle if completed, half circle if not */}
      <div className="ml-auto">
        <FontAwesomeIcon
          icon={section.progress === 100 ? faCircle : faCircleHalfStroke}
          className={`text-[20px] mr-6 ${section.progress > 0 ? "visible" : "invisible"} ${section.progress < 100 ? "text-[#FFD700]" : "text-[#32CD32]"}`}
        />
      </div>
    </button>
  );
}

export default function ClubAgreementPage() {
  const [refreshKey, setRefreshKey] = useState(0); // add a state to force re-render

  function submitDraft() {
    // TODO: Submit the draft, to turn it into an official application
  }

  const [club, setClub] = useState(new ClubApplication());

  // load the draft from the database
  useEffect(() => {
    // a function to load the draft from the database
    async function loadDraft() {
      const token = getToken();
      if (!token) {
        console.log("no token");
        return new ClubApplication();
      }
    
      try {
        const response = await fetch("/api/draft", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        const newClub = new ClubApplication();
        newClub.loadFromJSON(data);
        return newClub;
      } catch (error) {
        console.error("Error:", error);
        return new ClubApplication();
      }
    }
    // Define an async function inside the useEffect
    async function fetchDraft() {
      try {
        const newClub = await loadDraft();
        updateClub(newClub, false); // Then set the club
        // once the club is set we need to go to section 1, club advisors, then back to section 0, club information in order to update the input fields
        setCurrentSection(-1);
        // delay the update to allow the club to update
        setTimeout(() => {
          setCurrentSection(0);
        }, 1000);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
    
    fetchDraft(); // Call the async function
  }, []); // Dependencies array

  const containerRef = useRef(null);

  const handleSectionClick = (index) => {
    setCurrentSection(index);
    containerRef.current.scrollIntoView({ behavior: "auto", block: "start" });
  };

  const goToNextSection = () => {
    setCurrentSection((prevSection) => {
      const newSection =
        prevSection < sections.length - 1 ? prevSection + 1 : prevSection;
      // Scroll to the top of the container when moving to the next section
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }
      return newSection;
    });
  };

  // function to save the draft to the database
  function saveDraft(club) {
    const token = getToken();
    if (!token) {
      return;
    }
    // get the JSON for the club object
    const clubJSON = club.getJSON();
    
    // send a POST request to the server with the JSON data
    fetch("/api/draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clubJSON),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Section saved");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Function to update the club state
  function updateClub(newClubData, saveToDatabase = true) {
    // Create a new club object with the updated data
    const updatedClub = new ClubApplication();
    updatedClub.clubInformation = newClubData.clubInformation;
    updatedClub.clubAdvisors = newClubData.clubAdvisors;
    updatedClub.clubOfficers = newClubData.clubOfficers;
    updatedClub.clubMembers = newClubData.clubMembers;
    updatedClub.clubAgreement = newClubData.clubAgreement;
    // Update the club state
    //as a test set the title to "test"
    if (!saveToDatabase){
      updatedClub.clubInformation.clubName = "test";
    }
    setClub(updatedClub);
    // Calculate the progress of the application
    updateCompletionPercentage(updatedClub, sections, setSections);
    // update all club values in the sections
    setSections(prevSections => prevSections.map(section => ({
      ...section,
      form: React.cloneElement(section.form, { club: updatedClub })
    })));

    // Save the draft to the database
    if (saveToDatabase){
      saveDraft(updatedClub);
    }
    setRefreshKey((prevKey) => prevKey + 1); // Force a re-render
  }


  const loadingForm = (
    <LoadingPage/>
  );

  const [sections, setSections] = useState([
    {
      title: "CLUB INFORMATION",
      form: (
        <ClubInformation
          club={club}
          updateClub={updateClub}
          goToNextSection={goToNextSection}
        />
      ),
      progress: 0,
    },
    {
      title: "CLUB ADVISORS",
      form: (
        <ClubAdvisors
          club={club}
          updateClub={updateClub}
          goToNextSection={goToNextSection}
        />
      ),
      progress: 0,
    },
    {
      title: "CLUB OFFICERS",
      form: (
        <ClubOfficers
          club={club}
          updateClub={updateClub}
          goToNextSection={goToNextSection}
        />
      ),
      progress: 0,
    },
    {
      title: "CLUB MEMBER ROSTER",
      form: (
        <ClubMembers
          club={club}
          updateClub={updateClub}
          goToNextSection={goToNextSection}
        />
      ),
      progress: 0,
    },
    {
      title: "CLUB AGREEMENT",
      form: (
        <ClubAgreemet
          club={club}
          updateClub={updateClub}
          goToNextSection={goToNextSection}
        />
      ),
      progress: 0,
    },
    {
      title: "SUBMIT APPLICATION",
      form: <SubmitApplication club={club} submitDraft={submitDraft} />,
      progress: 0,
    },
  ]);

  const [currentSection, setCurrentSection] = useState(0);
  return (
    <div ref={containerRef}>
      <NavbarForApplication></NavbarForApplication>
      <div
        id="club-application-page"
        className="flex justify-center pb-[220px] xsm:pb-[0px] pt-[60px] xlg:pt-[30px] xsm:pt-0 min-h-screen h-full 
        bg-gradient-to-bl to-[#112B66] from-[#508BB8] gap-[58px] xsm:gap-0 xlg:flex-col-reverse
        xlg:items-center"
      >
        <div className="bg-offWhite w-[850px] h-fit lg:w-[90%] xsm:w-[100%] lg:mx-auto">
          {/* if there is a form, load it */}
          {sections[currentSection] ? (
            sections[currentSection].form
          ) : (
            loadingForm
          )}
          
        </div>
        
        <div className="flex flex-col gap-y-10 sticky top-5 xsm:top-0 h-fit z-1 xlg:relative xlg:gap-x-12 lg:w-[100%]">

          <div className="w-[280px] text-[15px] sm:text-[14px] h-fit xlg:w-[850px] lg:w-[90%] xsm:w-[100%] lg:mx-auto xsm:border-b-8 border-b-darkBlue">
            <div>
              <div className="bg-darkBlue flex items-center text-white w-full pl-6 h-[55px] sm:h-[50px]">
                <h1 className="tracking-wider">REGISTRATION PACKET</h1>
              </div>
              {sections.map((section, index) => {
                return (
                  <SectionButton
                    key={index}
                    section={section}
                    index={index}
                    currentSection={currentSection}
                    handleSectionClick={handleSectionClick}
                  />
                );
              })}
            </div>
            <div className="bg-offWhite"></div>
          </div>

          <div className="w-[280px] text-[15px] h-[190px] bg-offWhite flex flex-col gap-y-6 p-6 xlg:w-[850px] 
          xlg:flex-row xlg:h-[120px] xlg:justify-around xlg:items-center xlg:hidden">
              <div className="flex flex-col">
                <h1 className="text-darkBlue tracking-wide">Application Deadline</h1>
                <p className="font-[Nunito] text-[15px]">Thursday, January 25th 2024</p>
              </div>

            <div className="flex flex-col">
              <h1 className="text-lightBlue mb-1">Need Help?</h1>
              <p className="font-[Nunito] text-[15px] mb-1">
                Email: espinozaa@yosemite.edu
              </p>
              <p className="font-[Nunito] text-[15px]">Phone: 209-575-6479</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}