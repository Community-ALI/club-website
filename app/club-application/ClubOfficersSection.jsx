import { useState } from "react";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";

export default function ClubOfficersSection() {
  const [clubOfficers, setClubOfficers] = useState([
    {
      role: "",
      name: "",
      email: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
    },
  ]);

  return (
    <div>
      <ClubApplicationHeaderSection sectionTitle="Club Officers" />
      <div>
        <p>
          The following are the officers for the club. Each officer must be a
          currently enrolled student at Modesto Junior College.
        </p>
        <hr />
      </div>
    </div>
  );
}
