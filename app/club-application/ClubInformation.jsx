import React, { useState } from 'react';
import asmjc_pic_remembreance_day from "@pictures/asmjc_pic_remembrance_day.png";
import Image from 'next/image';

const ClubInformation = () => {
    const [clubName, setClubName] = useState('');
    const [meetingDays, setMeetingDays] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [meetingLocation, setMeetingLocation] = useState('');
    const [buildingRoomNumber, setBuildingRoomNumber] = useState('');
    const [zoomLink, setZoomLink] = useState('');

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
