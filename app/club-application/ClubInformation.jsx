import React, { useState } from 'react';
import asmjc_pic_remembreance_day from "@pictures/asmjc_pic_remembrance_day.png";
import Image from 'next/image';

const ClubInformation = () => {
    const [ClubInformation, setClubInformation] = useState({
        clubName: '',
        meetingDaysAndTime: '',
        meetingLocation: '',
        buildingRoomNumber: '',
        zoomLink: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit}>
            <Image src={asmjc_pic_remembreance_day} alt="ASMJC Remembrance Day" />
            <div></div>
            <ClubApplicationSection sectionTitle="CLUB INFORMATION" />
            <div>
                <p>The Associated Students of Modesto Junior College are responsible for the registration of all student clubs and organizations. To be considered as a new or returning club, this packet MUST be submitted along with a Constitution and Bylaws, Officer Roster, and Membership Roster with five (5) members to Campus Life Department and Student Learning.</p>
                <hr />
            </div>
            <div>
                <h3>Club Name</h3>
                <input type="text" value={ClubInformation.clubName} 
                onChange={(e) => setClubInformation({...ClubInformation, "clubName": e.target.value})} />
                <input type="text" value={ClubInformation.meetingDaysAndTime} 
                onChange={(e) => setClubInformation({...ClubInformation, "meetingDaysAndTime": e.target.value})} />
                <hr />
            </div>
        </form>
    );
};

function ClubApplicationSection(props) {
    const {sectionTitle} = props;


    return (<div className="bg-offWhite">
        <h1 className='text-darkBlue'>Registration Packet</h1>
        <h2 className='text-lightBlue mb-8'>{sectionTitle}</h2>
        <hr className='border-darkBlue border-[3px]'/>
    </div>)
}

export default ClubInformation;
