"use client";
import { useState } from "react";
import ClubInformation from "./ClubInformation";
import ClubAdvisors from "./ClubAdvisors";
import ClubOfficers from "./ClubOfficersSection";
import ClubMembers from "./ClubMembers";
import ClubAgreemet from "./ClubAgreement";
import SubmitApplication from "./SubmitApplication";

const defaultClubAdvisors = [
  {
    name: "",
    email: "",
    phoneNumber: "",
  },
];

const defaultClubOfficers = [
  {
    role: "Club President",
    name: "",
    email: "",
    wNumber: "",
    phoneNumber: "",
    major: "",
    gradeLevel: "",
    isRequired: true,
  },
  {
    role: "ICC Representative",
    name: "",
    email: "",
    wNumber: "",
    phoneNumber: "",
    major: "",
    gradeLevel: "",
    isRequired: true,
  },
  {
    role: "Club Vice President",
    name: "",
    email: "",
    wNumber: "",
    phoneNumber: "",
    major: "",
    gradeLevel: "",
    isRequired: false,
  },
  {
    role: "Club Secretary",
    name: "",
    email: "",
    wNumber: "",
    phoneNumber: "",
    major: "",
    gradeLevel: "",
    isRequired: false,
  },
  {
    role: "Club Treasurer",
    name: "",
    email: "",
    wNumber: "",
    phoneNumber: "",
    major: "",
    gradeLevel: "",
    isRequired: false,
  },
  {
    role: "Club Social Media Manager",
    name: "",
    email: "",
    wNumber: "",
    phoneNumber: "",
    major: "",
    gradeLevel: "",
    isRequired: false,
  },
];

const defaultMembers = [
  {
    name: "",
    email: "",
    wNumber: "",
  },
  {
    name: "",
    email: "",
    wNumber: "",
  },
  {
    name: "",
    email: "",
    wNumber: "",
  },
  {
    name: "",
    email: "",
    wNumber: "",
  },
  {
    name: "",
    email: "",
    wNumber: "",
  },
];

const defaultClubAgreement = 
  [
    {
      role: "Club President",
      signature: "",
      date: "",
    },
    {
      role: "Club Advisor",
      signature: "",
      date: "",
    },
  ];

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

// create a class for club advisors
class ClubAdvisor {
  constructor() {
    this.advisorID = 0;
    this.name = "";
    this.email = "";
    this.phoneNumber = "";
  }
}

// create a class for club officers
class ClubOfficer {
  constructor() {
    this.officerID = 0;
    this.name = "";
    this.email = "";
    this.phoneNumber = "";
    this.position = "";
    this.major = "";
    this.gradeLevel = "";
  }
}

// create a class for club members
class ClubMember {
  constructor() {
    this.memberID = 0;
    this.name = "";
    this.email = "";
    this.wNumber = "";
  }
}

export default function ClubAgreementPage() {
  function submitDraft() {
    console.log("submit draft");
    const testJson = {
      clubName: "Chess Club",
      meetingDaysTimes: "Fridays at 5 PM",
      meetingLocation: "Room 101",
      buildingRoomNumber: "Building A, Room 101",
      zoomLink: "https://zoom.us/j/123456789",
      clubPresidentSignature: "John Doe",
      dateOfPresidentSignature: "2024-01-15",
      clubAdvisorSignature: "Jane Smith",
      dateOfAdvisorSignature: "2024-01-16",
      advisors: [
        {
          advisorID: 1,
          name: "Advisor Name",
          email: "advisor@example.com",
          phoneNumber: "123-456-7890",
        },
      ],
      officers: [
        {
          officerID: 1,
          name: "Officer Name",
          email: "officer@example.com",
          phoneNumber: "234-567-8901",
          position: "President",
          major: "Computer Science",
          gradeLevel: "Senior",
        },
      ],
      members: [
        {
          memberID: 1,
          name: "Member Name",
          email: "member@example.com",
          wNumber: "W1234567",
        },
      ],
    };
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

  const [club, setClub] = useState(new ClubApplication());

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
  }

  const sections = [
    {
      title: "CLUB INFORMATION",
      form: <ClubInformation club={club} updateClub={updateClub} />,
    },
    {
      title: "CLUB ADVISORS",
      form: <ClubAdvisors club={club} updateClub={updateClub} />,
    },
    {
      title: "CLUB OFFICERS",
      form: <ClubOfficers club={club} updateClub={updateClub} />,
    },
    {
      title: "CLUB MEMBER ROSTER",
      form: <ClubMembers club={club} updateClub={updateClub} />,
    },
    {
      title: "CLUB AGREEMENT",
      form: <ClubAgreemet club={club} updateClub={updateClub} />,
    },
    {
      title: "SUBMIT APPLICATION",
      form: <SubmitApplication form={club} updateClub={updateClub} />,
    },
  ];

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
