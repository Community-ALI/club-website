import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import { useState } from "react";
import RoundedButton from "@components/RoundedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function ClubAdvisors(props) {
  const {club, updateClub} = props;
  const [clubMembers, setClubMembers] = useState(club.clubMembers);

  const removeMembers = (indexToRemove) => {
    setClubMembers(clubMembers.filter((_, index) => index !== indexToRemove));
  };

  function handleSubmit() {
    // add the members to the club object
    club.clubMembers = clubMembers;
    updateClub(club);
    props.goToNextSection();
  }

  return (
    <div className="px-12 py-12 md:px-[30px] xsm:px-[20px]">
      <ClubApplicationHeaderSection sectionTitle="Club Members Roster" />
      <div>
        <p className="px-3 mt-[20px] mb-[30px] font-[Nunito] text-[15px] xsm:text-[14px]">
          A minimum of 5 club members are required for a club to be active.
          Every club member must be a current MJC student enrolled in at least one unit for the current semester.
          <span className="font-bold"> IMPORTANT:</span> Please include the club officers in the member roster list below.
        </p>
        <hr className="border-lightGray border-[.5px]"></hr>
      </div>
      <div>
        {clubMembers.map((advisor, index) => {
          return (
            <ClubAdvisorField
              advisorIndex={index}
              setClubAdvisors={setClubMembers}
              clubAdvisors={clubMembers}
              key={index}
              removeMembers={removeMembers}
            />
          );
        })}
      </div>
      <div className="flex gap-x-[60px] gap-y-0 sm:flex-col">
        <RoundedButton
          innerHTML="Add Member"
          variant={1}
          onClick={() =>
            setClubMembers([
              ...clubMembers,
              { name: "", email: "", phoneNumber: "" },
            ])
          }
        />
        <RoundedButton 
        innerHTML="Save and Continue" 
        variant={0} 
        onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

function ClubAdvisorField(props) {
  const { advisorIndex, setClubAdvisors, clubAdvisors } = props;

  return (
    <div className="relative">
        {advisorIndex > 4 && (
        <div className="absolute top-0 right-0">
          <FontAwesomeIcon 
            icon={faCircleMinus} 
            className="cursor-pointer text-[20px] text-[#ff2200]" 
            onClick={() => props.removeMembers(advisorIndex)} 
          />
        </div>
      )}
      <h2 className="mt-8 px-3">{`CLUB Member #${advisorIndex + 1}`}</h2>
      <div className="flex items-center flex-wrap gap-x-[80px] px-3">
        <ClubApplicationTextField
          label="Full Name"
          value={clubAdvisors[advisorIndex].name}
          onChange={(e) =>
            setClubAdvisors(
              clubAdvisors.map((advisor, index) => {
                if (index == advisorIndex) {
                  return {
                    ...advisor,
                    name: e.target.value,
                  };
                }
                return advisor;
              })
            )
          }
        />
        <ClubApplicationTextField
          label="School Email"
          value={clubAdvisors[advisorIndex].email}
          onChange={(e) =>
            setClubAdvisors(
              clubAdvisors.map((advisor, index) => {
                if (index == advisorIndex) {
                  return {
                    ...advisor,
                    email: e.target.value,
                  };
                }
                return advisor;
              })
            )
          }
        />
        <ClubApplicationTextField
          label="W Number"
          value={clubAdvisors[advisorIndex].phoneNumber}
          onChange={(e) =>
            setClubAdvisors(
              clubAdvisors.map((advisor, index) => {
                if (index == advisorIndex) {
                  return {
                    ...advisor,
                    phoneNumber: e.target.value,
                  };
                }
                return advisor;
              })
            )
          }
        />
      </div>
      <hr className="border-lightGray border-[.5px] mt-[50px]"></hr>
    </div>
  );
}
