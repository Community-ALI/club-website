"use client";
import { useState } from "react";
import ClubInformation from "./ClubInformation";
import ClubAdvisors from "./ClubAdvisors";
import ClubOfficers from "./ClubOfficersSection";
import ClubMembers from "./ClubMembers";
import ClubAgreemet from "./ClubAgreement";
import SubmitApplication from "./SubmitApplication";

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
    this.clubAdvisors = [];
    this.clubOfficers = [];
    this.clubMembers = [];
    this.clubAgreement = {
      clubPresidentSignature: "",
      dateOfPresidentSignature: "",
      clubAdvisorSignature: "",
      dateOfAdvisorSignature: "",
    };
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

  const club = new ClubApplication();

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
    ]);
  }

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
