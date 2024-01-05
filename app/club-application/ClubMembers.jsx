import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import { useState } from "react";
import RoundedButton from "@components/RoundedButton";

export default function ClubAdvisors() {
  const [clubMembers, setClubMembers] = useState([
    {
      name: "",
      email: "",
      wNumber: "",
    },
    {
      name: "",
      email: "",
      wNumber: "",
    },
  ]);

  return (
    <div className="p-12">
      <ClubApplicationHeaderSection sectionTitle="Club Members Roster" />
      <div className="pt-8">
        <p>
          A minimum of 5 club members are required for a club to be active.
          Every club member that is not a club officer must be a current MJC
          student enrolled in at least one unit for the current semester.
        </p>
        <hr />
      </div>
      <div>
        {clubMembers.map((advisor, index) => {
          return (
            <ClubAdvisorField
              advisorIndex={index}
              setClubAdvisors={setClubMembers}
              clubAdvisors={clubMembers}
              key={index}
            />
          );
        })}
      </div>
      <div className="flex gap-[31px]">
        <RoundedButton
          innerHTML="Another Advisor"
          variant={0}
          onClick={() =>
            setClubMembers([
              ...clubMembers,
              { name: "", email: "", phoneNumber: "" },
            ])
          }
        />
        <RoundedButton innerHTML="Save and Continue" variant={0} />
      </div>
    </div>
  );
}

function ClubAdvisorField(props) {
  const { advisorIndex, setClubAdvisors, clubAdvisors } = props;

  return (
    <div className="">
      <h2 className="mt-8">{`CLUB Member #${advisorIndex + 1}`}</h2>
      <div className="flex items-center flex-wrap">
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

      <hr />
    </div>
  );
}
