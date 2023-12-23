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
        </form>
    );
};

export default ClubInformation;
