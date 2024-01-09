function MyComponent() {
  // the JSON object that will be used to populate the PDF
  const clubApplicationJSON = {
    clubName: "Chess Club",
    meetingDaysTimes: "Fridays at 5 PM",
    meetingLocation: "Room 101",
    buildingRoomNumber: "Building A, Room 101",
    zoomLink: "https://zoom.us/j/123456789",
    clubPresidentSignature: "John Doe",
    dateOfPresidentSignature: "2024-01-15",
    clubAdvisorSignature: "Jane Smith",
    dateOfAdvisorSignature: "2024-01-16",
    advisors: [
      {
        advisorID: 1,
        name: "Advisor Name",
        email: "advisor@example.com",
        phoneNumber: "123-456-7890",
      },
    ],
    officers: [
      {
        officerID: 1,
        name: "Officer Name",
        email: "officer@example.com",
        phoneNumber: "234-567-8901",
        position: "President",
        major: "Computer Science",
        gradeLevel: "Senior",
      },
      {
        officerID: 2,
        name: "Officer Name 2",
        email: "officer2@example.com",
        phoneNumber: "345-678-9012",
        position: "Vice President",
        major: "Computer Science",
        gradeLevel: "Sophomore",
      }
    ],
    members: [
      {
        memberID: 1,
        name: "Member Name",
        email: "member@example.com",
        wNumber: "W1234567",
      },
    ],
  };
  // TODO: add the rest of the fields to the PDF
  // TODO: style the PDF
  return (
    <div>
      <h1
        className="text-darkBlue text-[55px] xlg:text-[50px] 
      lg:text-[40px] md:text-[35px] sm:text-[30px] xsm:text-[34px] md:mt-[50px]
        text-center mt-[40px] xsm:mt-[40px] xxsm:text-[30px]"
      >
        {clubApplicationJSON.clubName}
      </h1>
      <p>{clubApplicationJSON.clubAdvisorSignature}</p>
    </div>
  );
}

export default MyComponent;
