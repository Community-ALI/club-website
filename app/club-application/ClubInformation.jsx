import React, { useState } from "react";
import asmjc_pic_remembreance_day from "@pictures/asmjc_pic_remembrance_day.png";
import Image from "next/image";
import ClubApplicationTextField from "./ClubApplicationTextField";
import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationRadioField from "./ClubApplicationRadioField";
import RoundedButton from "@components/RoundedButton";

const ClubInformation = (props) => {
  const { club, setClub } = props;

  const [ClubInformation, setClubInformation] = useState({
    clubName: club.clubName,
    meetingDaysAndTime: club.meetingDaysAndTime,
    meetingLocation: club.meetingLocation,
    buildingAndRoomNumber: club.buildingAndRoomNumber,
    zoomLink: club.zoomLink,
  });

  const meetingLocationOptions = ["In Person", "Online/Zoom", "Both"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setClub({
      ...club,
      clubName: ClubInformation.clubName,
      meetingDaysAndTime: ClubInformation.meetingDaysAndTime,
      meetingLocation: ClubInformation.meetingLocation,
      buildingAndRoomNumber: ClubInformation.buildingAndRoomNumber,
      zoomLink: ClubInformation.zoomLink,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Image src={asmjc_pic_remembreance_day} alt="ASMJC Remembrance Day" />
      <div className="p-12">
        <ClubApplicationHeaderSection sectionTitle="CLUB INFORMATION" />
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
            <div className="flex items-center">
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
      <div className="bg-veryLightGray px-12 mt-8 pb-12">
        <div className="px-8 flex">
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
      </div>
      <div className="px-20 pb-12">
        <hr />
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
