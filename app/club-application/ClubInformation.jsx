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
        </form>
    );
};

function ClubApplicationSection(props) {
    const {sectionTitle} = props;

    
    return (<div className="p-8 bg-offWhite">
        <h1 className='text-darkBlue'>Registration Packet</h1>
        <h2 className='text-lightBlue mb-8'>{sectionTitle}</h2>
        <hr className='border-darkBlue border-[3px]'/>
    </div>)
}

export default ClubInformation;
