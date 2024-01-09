"use client";
import { useState } from "react";
import ClubInformation from "./ClubInformation";
import ClubAdvisors from "./ClubAdvisors";
import ClubOfficers from "./ClubOfficersSection";
import ClubMembers from "./ClubMembers";
import ClubAgreemet from "./ClubAgreement";
import SubmitApplication from "./SubmitApplication";
import NavbarForApplication from "../components/navbar-for-application";

export default function ClubAgreementPage() {
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
    <>
    <NavbarForApplication></NavbarForApplication>
        <div
      id="club-application-page"
      className="flex justify-center pb-[220px] pt-[80px] min-h-screen h-full bg-gradient-to-bl to-[#112B66] from-[#508BB8] gap-[58px]"
    >
      <div className="bg-offWhite w-[850px] h-fit">
        {sections[currentSection].form}
      </div>
      <div className="w-[300px] text-[15px]">
        <div className="bg-offWhite">
          <div className="bg-darkBlue flex items-center text-white w-full pl-8 h-[61px]">
            <h1 className="tracking-wider">REGISTRATION PACKET</h1>
          </div>
          {sections.map((section, index) => {
            const bgColor = index != 5 ? "bg-veryLightGray" : "bg-while";
            const selectionColor = index != 5 ? "bg-lightGray" : "bg-lightBlue";
            return (
              <button
                className={`hover:cursor-pointer h-[60px] w-full border-b-darkGray border-b-[1px]
              ${currentSection != index ? bgColor : selectionColor}`}
                key={index}
                onClick={() => setCurrentSection(index)}
              >
                <h2 className="pl-8 text-left">{section.title}</h2>
              </button>
            );
          })}
        </div>
        <div className="bg-offWhite"></div>
      </div>
    </div>
    </>

  );
}
