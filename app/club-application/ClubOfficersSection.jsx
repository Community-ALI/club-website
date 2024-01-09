import { useState } from "react";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import ClubApplicationSelectField from "./ClubApplicationSelectField";
import ClubApplicationRadioField from "./ClubApplicationRadioField";
import RounudedButton from "@components/RoundedButton";

export default function ClubOfficersSection(props) {
  const {club, updateClub} = props;
  const [clubOfficers, setClubOfficers] = useState(club.clubOfficers);
  // function to handle the submit button
  function handleSubmit() {
    // update the club object
    club.clubOfficers = clubOfficers;
    updateClub(club);
    props.goToNextSection();
  }


  const gradeLevels = ["Freshman (1st Year)", "Sophomore (2nd Year)", "Junior (3rd Year)", "Senior (4th Year)", "5+ Years"];

  return (
    <div className="p-12">
      <ClubApplicationHeaderSection sectionTitle="Club Officers" />
      <p className="px-3 mt-[20px] mb-[30px] font-[Nunito] text-[15px]">
        The following are the officers for the club. For a club to be active, a Club President and an Inter-Club Council Representative is required. 
        These roles can only be assigned to current MJC students and all club officers are required a minimum GPA of 2.0
      </p>
      <hr className="border-lightGray border-[.5px] mb-9"></hr>
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
      <div className="mt-8">
        <RounudedButton 
        innerHTML="Save and Continue" 
        variant={0} 
        onClick={handleSubmit}/>
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
    <div className="">
      {!isRequired ? (
        <div className="pb-8">
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
        <div className={`${!isRequired ? "mt-5" : ""}`}>
          <h2 className="px-3">{clubOfficers[officerIndex].role}</h2>

          <div className="flex flex-wrap gap-x-[80px] px-3">
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
              label="W Number"
              value={clubOfficers[officerIndex].wNumber}
              onChange={(e) => setOfficerField("wNumber", e.target.value)}
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
          <hr className="border-lightGray border-[.5px] my-[40px]"></hr>
        </div>
      ) : (
        <>
          <hr className="border-lightGray border-[.5px] my-5"></hr>
         </>
      )}
    </div>
  );
}
