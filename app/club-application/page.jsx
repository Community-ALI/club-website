"use client";
import { useState } from "react";
import ClubInformation from "./ClubInformation";
import ClubAdvisors from "./ClubAdvisors";
import ClubOfficers from "./ClubOfficersSection";
import ClubMembers from "./ClubMembers";
import ClubAgreemet from "./ClubAgreement";
import SubmitApplication from "./SubmitApplication";

export default function ClubAgreementPage() {
  function submitDraft() {
    console.log("submit draft");
    const testJson = {
      "clubName": "Chess Club",
    "meetingDaysTimes": "Fridays at 5 PM",
    "meetingLocation": "Room 101",
    "buildingRoomNumber": "Building A, Room 101",
    "zoomLink": "https://zoom.us/j/123456789",
    "clubPresidentSignature": "John Doe",
    "dateOfPresidentSignature": "2024-01-15",
    "clubAdvisorSignature": "Jane Smith",
    "dateOfAdvisorSignature": "2024-01-16",
    "advisors": [
        {
            "advisorID": 1,
            "name": "Advisor Name",
            "email": "advisor@example.com",
            "phoneNumber": "123-456-7890"
        }
    ],
    "officers": [
        {
            "officerID": 1,
            "name": "Officer Name",
            "email": "officer@example.com",
            "phoneNumber": "234-567-8901",
            "position": "President",
            "major": "Computer Science",
            "gradeLevel": "Senior"
        }
    ],
    "members": [
        {
            "memberID": 1,
            "name": "Member Name",
            "email": "member@example.com",
            "wNumber": "W1234567"
        }
    ]
  }
  // get the token from local storage to be used in the request header
  const token = localStorage.getItem("token");
  // send a POST request to the server with the JSON data
  fetch("/api/draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(testJson),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  const [club, setClub] = useState({
    clubInformation: {
      clubName: "",
      meetingDaysAndTime: "",
      meetingLocation: "",
      buildingAndRoomNumber: "",
      zoomLink: "",
    }
  });

  const [sections, setSections] = useState([
    {
      title: "CLUB INFORMATION",
      form: <ClubInformation club={club} setClub={handleClubChange} />,
    },
    {
      title: "CLUB ADVISORS",
      form: <ClubAdvisors />,
    },
    {
      title: "CLUB OFFICERS",
      form: <ClubOfficers />,
    },
    {
      title: "CLUB MEMBER ROSTER",
      form: <ClubMembers />,
    },
    {
      title: "CLUB AGREEMENT",
      form: <ClubAgreemet />,
    },
    {
      title: "SUBMIT APPLICATION",
      form: <SubmitApplication form={club} />,
    },
  ]);

  function handleClubChange(newClub) {
    setClub(newClub);
    setSections([
      {
        title: "CLUB INFORMATION",
        form: <ClubInformation club={newClub} setClub={handleClubChange} />,
      },
      {
        title: "CLUB ADVISORS",
        form: <ClubAdvisors />,
      },
      {
        title: "CLUB OFFICERS",
        form: <ClubOfficers />,
      },
      {
        title: "CLUB MEMBER ROSTER",
        form: <ClubMembers />,
      },
      {
        title: "CLUB AGREEMENT",
        form: <ClubAgreemet />,
      },
      {
        title: "SUBMIT APPLICATION",
        form: <SubmitApplication form={newClub} />,
      },
    ])
  };

  const [currentSection, setCurrentSection] = useState(0);
  return (
    
    <div
      id="club-application-page"
      className="flex justify-center py-[220px] min-h-screen h-full bg-gradient-to-bl to-[#112B66] from-[#508BB8] gap-[58px]"
    >
      {/* a test button to submit the form */}
      <button onClick={submitDraft}>Submit Draft</button>
      <div className="bg-offWhite w-[900px] h-fit">
        {sections[currentSection].form}
      </div>
      <div className="w-[350px]">
        <div className="bg-offWhite">
          <div className="bg-darkBlue flex items-center text-white w-full pl-12 h-[61px]">
            {/* TODO: Add arrow icon */}
            <h2>REGISTRATION PACKET</h2>
          </div>
          {sections.map((section, index) => {
            const bgColor = index != 5 ? "bg-veryLightGray" : "bg-while";
            const selectionColor = index != 5 ? "bg-lightGray" : "bg-lightBlue";
            return (
              <button
                className={`hover:cursor-pointer h-[60px] w-full 
              ${currentSection != index ? bgColor : selectionColor}`}
                key={index}
                onClick={() => setCurrentSection(index)}
              >
                <h2 className="pl-12 text-left">{section.title}</h2>
              </button>
            );
          })}
        </div>
        <div className="bg-offWhite"></div>
      </div>
    </div>
  );
}
