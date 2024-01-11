import React, { useState } from "react";
import asmjc_pic_remembreance_day from "@pictures/asmjc_pic_remembrance_day.png";
import Image from "next/image";
import ClubApplicationTextField from "./ClubApplicationTextField";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationRadioField from "./ClubApplicationRadioField";
import RoundedButton from "@components/RoundedButton";

const ClubInformation = (props) => {
  console.log('club information props', props);
  const { club, updateClub } = props;

  const [ClubInformation, setClubInformation] = useState(club.clubInformation);

  const meetingLocationOptions = ["In Person", "Online/Zoom", "Both"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // update the club object
    club.clubInformation = ClubInformation;
    updateClub(club);
    props.goToNextSection();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Image src={asmjc_pic_remembreance_day} alt="ASMJC Remembrance Day" />
      <div className="px-[50px] py-[30px]">
        <ClubApplicationHeaderSection sectionTitle="CLUB INFORMATION" />
        <div>
            <p className="font-[Nunito] text-[15px] mt-[20px] mb-[30px] px-3">
              The Associated Students of Modesto Junior College are responsible
              for the registration of all student clubs and organizations. To be
              considered as a new or returning club, this packet MUST be
              submitted along with a Constitution and Bylaws, Officer Roster,
              and Membership Roster with five (5) members to Campus Life
              Department and Student Learning.
            </p>
            <hr className="border-lightGray border-[.5px] mt-[20px]"></hr>
          <div>
            <div className="flex items-center gap-[80px] px-3">
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
                subtext="Example : Every Friday at 2pm"
                onChange={(e) =>
                  setClubInformation({
                    ...ClubInformation,
                    meetingDaysAndTime: e.target.value,
                  })
                }
              />
            </div>
            <hr className="border-lightGray border-[.5px] mt-[40px]"></hr>
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
      <div className="pr-12 pl-[62px] flex gap-[80px]">
        {ClubInformation.meetingLocation === "In Person" || ClubInformation.meetingLocation === "Both" ? (
          <div>
            <ClubApplicationTextField
              label="Building and Room Number"
              value={ClubInformation.buildingAndRoomNumber}
              onChange={(e) =>
                setClubInformation({
                  ...ClubInformation,
                  buildingAndRoomNumber: e.target.value,
                })
              }
            />
          </div>
        ) : null}
        {ClubInformation.meetingLocation === "Online/Zoom" || ClubInformation.meetingLocation === "Both" ? (
          <div>
            <ClubApplicationTextField
              label="Zoom Link"
              value={ClubInformation.zoomLink}
              onChange={(e) =>
                setClubInformation({
                  ...ClubInformation,
                  zoomLink: e.target.value,
                })
              }
            />
          </div>
        ) : null}
      </div>
      <div className="px-[50px] pb-[50px]">
      <hr className="border-lightGray border-[.5px] mt-[40px]"></hr>
        <RoundedButton
          innerHTML="Save and Continue"
          variant={0}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default ClubInformation;
