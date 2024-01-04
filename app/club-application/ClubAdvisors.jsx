import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import { useState } from "react";
import RoundedButton from "@components/RoundedButton";

export default function ClubAdvisors() {
  const [clubAdvisors, setClubAdvisors] = useState([
    {
      name: "",
      email: "",
      phoneNumber: "",
    },
    {
      name: "",
      email: "",
      phoneNumber: "",
    },
  ]);

  return (
    <div className="p-12">
      <ClubApplicationHeaderSection title="Club Advisors" />
      <div className="pt-8">
        <p>
          Only one advisor is required for a club to be active. An advisor must
          attend ALL club functions, including: meetings, activities, and trips.
          They must also sign off on all club functions, including: meetings,
          activities, and trips to ensure that all of the above items have been
          met or addressed.
        </p>
        <hr />
      </div>
      <div>
        {clubAdvisors.map((advisor, index) => {
          return (
            <ClubAdvisorField
              advisorIndex={index}
              setClubAdvisors={setClubAdvisors}
              clubAdvisors={clubAdvisors}
              key={index}
            />
          );
        })}
      </div>
      <RoundedButton
        innerHTML="Another Advisor"
        variant={0}
        onClick={() =>
          setClubAdvisors([
            ...clubAdvisors,
            { name: "", email: "", phoneNumber: "" },
          ])
        }
      />
    </div>
  );
}

function ClubAdvisorField(props) {
  const { advisorIndex, setClubAdvisors, clubAdvisors } = props;

  return (
    <div className="">
      <h2>{`CLUB ADVISOR #${advisorIndex + 1}`}</h2>
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
      </div>

      <hr />
    </div>
  );
}
