import React, { useState } from "react";
import asmjc_pic_remembreance_day from "@pictures/asmjc_pic_remembrance_day.png";
import Image from "next/image";

const ClubInformation = () => {
  const [ClubInformation, setClubInformation] = useState({
    clubName: "",
    meetingDaysAndTime: "",
    meetingLocation: "",
    buildingRoomNumber: "",
    zoomLink: "",
  });

  const meetingLocationOptions = ["In Person", "Online/Zoom", "Both"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Image src={asmjc_pic_remembreance_day} alt="ASMJC Remembrance Day" />
      <div className="p-12">
        <ClubApplicationSection sectionTitle="CLUB INFORMATION" />
        <div className="px-8">
          <div>
            <p>
              The Associated Students of Modesto Junior College are responsible
              for the registration of all student clubs and organizations. To be
              considered as a new or returning club, this packet MUST be
              submitted along with a Constitution and Bylaws, Officer Roster,
              and Membership Roster with five (5) members to Campus Life
              Department and Student Learning.
            </p>
            <hr />
          </div>
          <div>
            <ClubApplicationTextField
              label="Club Name"
              value={ClubInformation.clubName}
              subtext="Start the name with MJC"
              onChange={(e) =>
                setClubInformation({
                  ...ClubInformation,
                  clubName: e.target.value,
                })
              }
            />
            <ClubApplicationTextField
              label="Meeting Days and Time"
              value={ClubInformation.meetingDaysAndTime}
              onChange={(e) =>
                setClubInformation({
                  ...ClubInformation,
                  meetingDaysAndTime: e.target.value,
                })
              }
            />
            <hr />
            <ClubApplicationRadioField
              label="Meeting Location"
              subtext="Select the environment of your club meetings"
              value={ClubInformation.meetingLocation}
              onChange={(e) =>
                !setClubInformation({
                  ...ClubInformation,
                  meetingLocation: e.target.value,
                })
              }
              options={meetingLocationOptions}
              checkedValue={ClubInformation.meetingLocation}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

function ClubApplicationSection(props) {
  const { sectionTitle } = props;

  return (
    <div className="bg-offWhite">
      <h1 className="text-darkBlue">Registration Packet</h1>
      <h2 className="text-lightBlue mb-8">{sectionTitle}</h2>
      <hr className="border-darkBlue border-[3px]" />
    </div>
  );
}

function ClubApplicationTextField(props) {
  const { label, subtext, value, onChange } = props;

  return (
    <div className="flex flex-col gap-2 mt-8">
      <label className="text-lightBlue font-bold text-lg">{label}</label>
      <p>{subtext}</p>
      <input
        type="text"
        className="h-[40px] w-[350px] border-solid border-[1px] border-lightGray bg-#FFFFFF"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ClubApplicationRadioField(props) {
  const { label, subtext, onChange, options, checkedValue } = props;

  return (
    <div className="flex flex-col gap-2 mt-8">
      <h4 className="text-lightBlue font-bold text-lg">{label}</h4>
      <p>{subtext}</p>
      <div className="flex gap-16 mt-8">
        {options.map((option, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                value={option}
                onChange={onChange}
                checked={checkedValue === option}
              />
              <label>{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClubInformation;
