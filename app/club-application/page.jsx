"use client";
import { useState } from "react";
import ClubInformation from "./ClubInformation";
import ClubAdvisors from "./ClubAdvisors";
import ClubOfficers from "./ClubOfficersSection";

const sections = [
  {
    title: "CLUB INFORMATION",
    form: <ClubInformation />,
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
  },
  {
    title: "CLUB AGREEMENT",
  },
  {
    title: "SUBMIT APPLICATION",
  },
];

export default function ClubAgreementPage() {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <div
      id="club-application-page"
      className="flex justify-center py-[220px] min-h-screen h-full bg-gradient-to-bl to-[#112B66] from-[#508BB8] gap-[58px]"
    >
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
            const selectionColor =
              index != 5 ? "bg-lightGray" : "bg-lightBlue";
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
