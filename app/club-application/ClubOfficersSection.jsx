import { useState } from "react";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import ClubApplicationSelectField from "./ClubApplicationSelectField";
import ClubApplicationRadioField from "./ClubApplicationRadioField";
import RounudedButton from "@components/RoundedButton";

export default function ClubOfficersSection() {
  const [clubOfficers, setClubOfficers] = useState([
    {
      role: "Club President",
      name: "",
      email: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: true,
    },
    {
      role: "Club Vice President",
      name: "",
      email: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
    },
    {
      role: "Club Secretary",
      name: "",
      email: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
    },
    {
      role: "Club Treasurer",
      name: "",
      email: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
    },
    {
      role: "Club Social Media Manager",
      name: "",
      email: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
    },
  ]);

  const gradeLevels = ["Freshman", "Sophomore", "Junior", "Senior"];

  return (
    <div className="py-12">
      <ClubApplicationHeaderSection sectionTitle="Club Officers" />
      <p className="pt-8 px-12">
        The following are the officers for the club. Each officer must be a
        currently enrolled student at Modesto Junior College.
      </p>
      <hr />
      {clubOfficers.map((officer, index) => {
        return (
          <OfficerField
            officerIndex={index}
            setClubOfficers={setClubOfficers}
            clubOfficers={clubOfficers}
            gradeLevels={gradeLevels}
            key={index}
            isRequired={officer.isRequired}
          />
        );
      })}
      <hr />
      <div className="mt-8 px-12">
        <RounudedButton innerHTML="Save and Continue" variant={0} />
      </div>
    </div>
  );
}

function OfficerField(props) {
  const {
    officerIndex,
    setClubOfficers,
    clubOfficers,
    gradeLevels,
    isRequired,
  } = props;
  const [showOfficerField, setShowOfficerField] = useState(isRequired);
  function setOfficerField(field, value) {
    setClubOfficers(
      clubOfficers.map((officer, index) =>
        index === officerIndex ? { ...officer, [field]: value } : officer
      )
    );
  }

  return (
    <div>
      {!isRequired ? (
        <div className="pb-8 px-12">
          <ClubApplicationRadioField
            label={`Do you have a ${clubOfficers[officerIndex].role}?`}
            subtext="This position is not required but is recommended"
            value={showOfficerField ? "Yes" : "No"}
            onChange={(e) => setShowOfficerField(e.target.value === "Yes")}
            options={["Yes", "No"]}
            checkedValue={showOfficerField ? "Yes" : "No"}
          />
        </div>
      ) : (
        <></>
      )}

      {showOfficerField ? (
        <div className={`py-8 px-12 ${!isRequired ? "bg-veryLightGray" : ""}`}>
          <h2>{clubOfficers[officerIndex].role}</h2>

          <div className="px-8">
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
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}
