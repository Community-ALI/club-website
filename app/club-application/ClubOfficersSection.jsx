import { useState } from "react";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import ClubApplicationSelectField from "./ClubApplicationSelectField";

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

  const gradeLevels = ["Freshman", "Sophomore", "Junior", "Senior"];

  return (
    <div>
      <ClubApplicationHeaderSection sectionTitle="Club Officers" />
        <p>
          The following are the officers for the club. Each officer must be a
          currently enrolled student at Modesto Junior College.
        </p>
        <hr />
        <OfficerField officerIndex={0} setClubOfficers={setClubOfficers} clubOfficers={clubOfficers} gradeLevels={gradeLevels} />
    </div>
  );
}

function OfficerField(props) {
  const { officerIndex, setClubOfficers, clubOfficers, gradeLevels } = props;
  function setOfficerField(field, value) {
    setClubOfficers(
      clubOfficers.map((officer, index) =>
        index === officerIndex ? { ...officer, [field]: value } : officer
      )
    );
  }
  return (
    <div className="">
      <h2 className="mt-8">{clubOfficers[officerIndex].role}</h2>

      <ClubApplicationTextField
        label="Full Name"
        value={clubOfficers[officerIndex].name}
        onChange={(e) => setOfficerField("name", e.target.value)}
      />

      <ClubApplicationTextField
        label="School Email"
        value={clubOfficers[officerIndex].email}
        onChange={(e) => setOfficerField("email", e.target.value)}
      />

      <ClubApplicationTextField
        label="Phone Number"
        value={clubOfficers[officerIndex].phoneNumber}
        onChange={(e) => setOfficerField("phoneNumber", e.target.value)}
      />

      <ClubApplicationTextField
        label="Major"
        value={clubOfficers[officerIndex].major}
        onChange={(e) => setOfficerField("major", e.target.value)}
      />

      <ClubApplicationSelectField
        label="Grade Level"
        value={clubOfficers[officerIndex].gradeLevel}
        onChange={(e) => setOfficerField("gradeLevel", e.target.value)}
        options={gradeLevels}
      />
    </div>
  );
}
