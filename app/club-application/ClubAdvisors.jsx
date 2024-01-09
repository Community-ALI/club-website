import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import { useState } from "react";
import RoundedButton from "@components/RoundedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function ClubAdvisors(props) {
  const {club, updateClub} = props;

  function handleSubmit() {
    // add the advisors to the club object
    club.clubAdvisors = clubAdvisors;
    updateClub(club);
    console.log(club);
    // as a test, get the JSON for the club object and print it to the console
    console.log(club.getJSON());
  }

  const [clubAdvisors, setClubAdvisors] = useState(club.clubAdvisors);

  const removeAdvisor = (indexToRemove) => {
    setClubAdvisors(clubAdvisors.filter((_, index) => index !== indexToRemove));
  };


  return (
    <div className="p-12">
      <ClubApplicationHeaderSection sectionTitle="Club Advisors" />
      <div>
        <p className="font-[Nunito] text-[15px] mt-[20px] mb-[30px] px-3">
          Only one advisor is required for a club to be active. An advisor must
          attend ALL club functions, including: meetings, activities, and trips.
          They must also sign off on all club functions, including: meetings,
          activities, and trips to ensure that all of the above items have been
          met or addressed.
        </p>
        <hr className="border-lightGray border-[.5px] mt-[20px]"></hr>
      </div>
      <div>
        {clubAdvisors.map((advisor, index) => {
          return (
            <ClubAdvisorField
              advisorIndex={index}
              setClubAdvisors={setClubAdvisors}
              clubAdvisors={clubAdvisors}
              removeAdvisor={removeAdvisor}
              key={index}
            />
          );
        })}
      </div>
      <div className="flex gap-[60px]">
          <RoundedButton
            innerHTML="Add Advisor"
            variant={1}
            onClick={() =>
              setClubAdvisors([
                ...clubAdvisors,
                { name: "", email: "", phoneNumber: "" },
              ])
            }
          />
          <RoundedButton 
          innerHTML="Save and Continue" 
          variant={0} 
          onClick={props.goToNextSection}/>
      </div>
    </div>
  );
}

function ClubAdvisorField(props) {
  const { advisorIndex, setClubAdvisors, clubAdvisors} = props;

  return (
    <div className="relative">
      {advisorIndex !== 0 && (
        <div className="absolute top-0 right-0">
          <FontAwesomeIcon 
            icon={faCircleMinus} 
            className="cursor-pointer text-[20px] text-[#ff2200]" 
            onClick={() => props.removeAdvisor(advisorIndex)} 
          />
        </div>
      )}
      <h2 className="mt-9 px-3">{`CLUB ADVISOR #${advisorIndex + 1}`}</h2>
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
          label="Phone Number"
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
        <ClubApplicationTextField
          label="Employee Title"
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
      </div>
      <hr className="border-lightGray border-[.5px] mt-[50px]"></hr>
    </div>
  );
}
