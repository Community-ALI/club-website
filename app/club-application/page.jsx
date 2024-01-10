"use client";
import { useState, useRef } from "react";
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
import { defaultClubAdvisors, defaultClubOfficers, defaultMembers, defaultClubAgreement } from "./defaultClubData";
import updateCompletionPercentage from "./requiredData";

// create a class for club applications
class ClubApplication {

  constructor() {
    this.clubInformation = {
      clubName: "",
      meetingDaysAndTime: "",
      meetingLocation: "",
      buildingAndRoomNumber: "",
      zoomLink: "",
    };
    this.clubAdvisors = defaultClubAdvisors;
    this.clubOfficers = defaultClubOfficers;
    this.clubMembers = defaultMembers;
    this.clubAgreement = defaultClubAgreement;
  }
  addAdvisor(advisor) {
    this.clubAdvisors.push(advisor);
  }
  addOfficer(officer) {
    this.clubOfficers.push(officer);
  }
  addMember(member) {
    this.clubMembers.push(member);
  }
  removeAdvisor(advisorID) {
    this.clubAdvisors = this.clubAdvisors.filter(
      (advisor) => advisor.advisorID != advisorID
    );
  }
  removeOfficer(officerID) {
    this.clubOfficers = this.clubOfficers.filter(
      (officer) => officer.officerID != officerID
    );
  }
  removeMember(memberID) {
    this.clubMembers = this.clubMembers.filter(
      (member) => member.memberID != memberID
    );
  }
  getJSON() {
    return {
      clubName: this.clubInformation.clubName,
      meetingDaysTimes: this.clubInformation.meetingDaysAndTime,
      meetingLocation: this.clubInformation.meetingLocation,
      buildingRoomNumber: this.clubInformation.buildingAndRoomNumber,
      zoomLink: this.clubInformation.zoomLink,
      clubPresidentSignature: this.clubAgreement.clubPresidentSignature,
      dateOfPresidentSignature: this.clubAgreement.dateOfPresidentSignature,
      clubAdvisorSignature: this.clubAgreement.clubAdvisorSignature,
      dateOfAdvisorSignature: this.clubAgreement.dateOfAdvisorSignature,
      advisors: this.clubAdvisors.map((advisor) => {
        return {
          advisorID: advisor.advisorID,
          name: advisor.name,
          email: advisor.email,
          phoneNumber: advisor.phoneNumber,
        };
      }),
      officers: this.clubOfficers.map((officer) => {
        return {
          officerID: officer.officerID,
          name: officer.name,
          email: officer.email,
          phoneNumber: officer.phoneNumber,
          position: officer.position,
          major: officer.major,
          gradeLevel: officer.gradeLevel,
        };
      }),
      members: this.clubMembers.map((member) => {
        return {
          memberID: member.memberID,
          name: member.name,
          email: member.email,
          wNumber: member.wNumber,
        };
      }),
    };
  }
}

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
  function submitDraft() {
    console.log("submit draft");
    // get the JSON for the club object
    const clubJSON = club.getJSON();
    // get the token from local storage to be used in the request header
    const token = localStorage.getItem("token");
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
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

    const [club, setClub] = useState(new ClubApplication());

    const containerRef = useRef(null);

    const handleSectionClick = (index) => {
      setCurrentSection(index);
      containerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    const goToNextSection = () => {
      setCurrentSection((prevSection) => {
        const newSection = prevSection < sections.length - 1 ? prevSection + 1 : prevSection;
        // Scroll to the top of the container when moving to the next section
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        return newSection;
      });
    };
  
  function calculateProgress(sectionIndex, club) { // this function calculates the progress of the application
    // the progress is calculated by the number of required fields that have been filled out
  }


  // Function to update the club state
  function updateClub(newClubData) {
    // Create a new club object with the updated data
    const updatedClub = new ClubApplication();
    updatedClub.clubInformation = newClubData.clubInformation;
    updatedClub.clubAdvisors = newClubData.clubAdvisors;
    updatedClub.clubOfficers = newClubData.clubOfficers;
    updatedClub.clubMembers = newClubData.clubMembers;
    updatedClub.clubAgreement = newClubData.clubAgreement;
    // Update the club state
    setClub(updatedClub);
    // Calculate the progress of the application
    console.log("updated club", updatedClub);
    console.log("sections", sections);
    updateCompletionPercentage(updatedClub, sections, setSections);
    
  }

  const [sections, setSections] = useState([ 
    {
      title: "CLUB INFORMATION",
      form: <ClubInformation club={club} updateClub={updateClub} goToNextSection={goToNextSection} />,
      progress: 0,
    },
    {
      title: "CLUB ADVISORS",
      form: <ClubAdvisors club={club} updateClub={updateClub} goToNextSection={goToNextSection}/>,
      progress: 0,
    },
    {
      title: "CLUB OFFICERS",
      form: <ClubOfficers club={club} updateClub={updateClub} goToNextSection={goToNextSection} />,
      progress: 0,
    },
    {
      title: "CLUB MEMBER ROSTER",
      form: <ClubMembers club={club} updateClub={updateClub} goToNextSection={goToNextSection} />,
      progress: 0,
    },
    {
      title: "CLUB AGREEMENT",
      form: <ClubAgreemet club={club} updateClub={updateClub} goToNextSection={goToNextSection} />,
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
        className="flex justify-center pb-[220px] pt-[60px] min-h-screen h-full 
        bg-gradient-to-bl to-[#112B66] from-[#508BB8] gap-[58px]"
      >
        <div className="bg-offWhite w-[850px] h-fit">
          {sections[currentSection].form}
        </div>
        
        <div className="flex flex-col gap-y-10 sticky top-5 h-fit z-10">

          <div className="w-[280px] text-[15px] h-fit">
            <div>
              <div className="bg-darkBlue flex items-center text-white w-full pl-6 h-[55px]">
                <h1 className="tracking-wider">REGISTRATION PACKET</h1>
              </div>
              {sections.map((section, index) => {
                
                return (
                  <SectionButton section={section} index={index} currentSection={currentSection} handleSectionClick={handleSectionClick} />
                );
              })}
            </div>
            <div className="bg-offWhite"></div>
          </div>

          <div className="w-[280px] text-[15px] h-[190px] bg-offWhite flex flex-col gap-y-6 p-6">
              <div className="flex flex-col">
                <h1 className="text-darkBlue tracking-wide">Application Deadline</h1>
                <p className="font-[Nunito] text-[15px]">Thursday, January 25th 2024</p>
              </div>

              <div className="flex flex-col">
                <h1 className="text-lightBlue mb-1">Need Help?</h1>
                <p className="font-[Nunito] text-[15px] mb-1">Email: espinozaa@yosemite.edu</p>
                <p className="font-[Nunito] text-[15px]">Phone: 209-575-6479</p>
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }