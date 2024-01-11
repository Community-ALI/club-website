const defaultClubAdvisors = [
    {
      name: "",
      email: "",
      phoneNumber: "",
    },
  ];
  
  const defaultClubOfficers = [
    {
      role: "Club President",
      name: "",
      email: "",
      wNumber: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: true,
      isUsed: true,
    },
    {
      role: "ICC Representative",
      name: "",
      email: "",
      wNumber: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: true,
      isUsed: true,
    },
    {
      role: "Club Vice President",
      name: "",
      email: "",
      wNumber: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
      isUsed: false,
    },
    {
      role: "Club Secretary",
      name: "",
      email: "",
      wNumber: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
      isUsed: false,
    },
    {
      role: "Club Treasurer",
      name: "",
      email: "",
      wNumber: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
      isUsed: false,
    },
    {
      role: "Club Social Media Manager",
      name: "",
      email: "",
      wNumber: "",
      phoneNumber: "",
      major: "",
      gradeLevel: "",
      isRequired: false,
      isUsed: false,
    },
  ];
  
  const defaultMembers = [
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
    {
      name: "",
      email: "",
      wNumber: "",
    },
  ];
  
  const defaultClubAgreement = 
    [
      {
        role: "Club President",
        signature: "",
        date: "",
      },
      {
        role: "Club Advisor",
        signature: "",
        date: "",
      },
    ];


    
// create a class for club applications
class ClubApplication {
  constructor() {
    this.clubInformation = {
      clubName: "",
      meetingDaysAndTime: "",
      meetingLocation: "",
      buildingAndRoomNumber: "",
      zoomLink: "",
    };
    this.clubAdvisors = defaultClubAdvisors;
    this.clubOfficers = defaultClubOfficers;
    this.clubMembers = defaultMembers;
    this.clubAgreement = defaultClubAgreement;
  }
  loadFromJSON(json) {
    this.clubInformation = {
      clubName: json.clubName,
      meetingDaysAndTime: json.meetingDaysTimes,
      meetingLocation: json.meetingLocation,
      buildingAndRoomNumber: json.buildingRoomNumber,
      zoomLink: json.zoomLink,
    };
    this.clubAdvisors = json.advisors;
    this.clubOfficers = json.officers;
    this.clubMembers = json.members;
    this.clubAgreement = [
      {
        role: "Club President",
        signature: json.clubPresidentSignature,
        date: json.dateOfPresidentSignature,
      },
      {
        role: "Club Advisor",
        signature: json.clubAdvisorSignature,
        date: json.dateOfAdvisorSignature,
      },
    ];
  }
  getJSON() {
    return {
      clubName: this.clubInformation.clubName,
      meetingDaysTimes: this.clubInformation.meetingDaysAndTime,
      meetingLocation: this.clubInformation.meetingLocation,
      buildingRoomNumber: this.clubInformation.buildingAndRoomNumber,
      zoomLink: this.clubInformation.zoomLink,
      clubPresidentSignature: this.clubAgreement.clubPresidentSignature,
      dateOfPresidentSignature: this.clubAgreement.dateOfPresidentSignature,
      clubAdvisorSignature: this.clubAgreement.clubAdvisorSignature,
      dateOfAdvisorSignature: this.clubAgreement.dateOfAdvisorSignature,
      advisors: this.clubAdvisors.map((advisor) => {
        return {
          advisorID: advisor.advisorID,
          name: advisor.name,
          email: advisor.email,
          phoneNumber: advisor.phoneNumber,
        };
      }),
      officers: this.clubOfficers.map((officer) => {
        return {
          officerID: officer.officerID,
          name: officer.name,
          email: officer.email,
          phoneNumber: officer.phoneNumber,
          position: officer.position,
          major: officer.major,
          gradeLevel: officer.gradeLevel,
        };
      }),
      members: this.clubMembers.map((member) => {
        return {
          memberID: member.memberID,
          name: member.name,
          email: member.email,
          wNumber: member.wNumber,
        };
      }),
    };
  }
}

export { ClubApplication };