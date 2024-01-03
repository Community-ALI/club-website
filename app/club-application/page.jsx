"use client";
import { useState } from "react";
import ClubInformation from "./ClubInformation";
import Navbar from "../components/navbar";

const sections = [
  {
    title: "CLUB INFORMATION",
    form: <ClubInformation />,
  },
  {
    title: "CLUB ADVISORS",
  },
  {
    title: "CLUB OFFICERS",
  },
  {
    title: "CLUB MEMBER ROSTER",
  },
  {
    title: "CLUB AGREEMENT",
  },
  {
    title: "SUBMIT APPLICATION"
  }
];

export default function ClubAgreementPage() {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <div id="club-application-page" className="flex justify-center pt-[220px] h-full bg-gradient-to-bl to-[#112B66] from-[#508BB8] gap-[58px]">
      <div className="bg-offWhite w-[900px]">
        {sections[currentSection].form}
      </div>
      <div className="w-[350px]">
      <div className="bg-offWhite">
        {sections.map((section, index) => {
          return (
            <div className="bg-offWhite" key={index}>
              <h2>{section.title}</h2>
            </div>
          )
          })}
      </div>
      <div className="bg-offWhite"></div>
      </div>
    </div>
  );
}
