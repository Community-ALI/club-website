  const defaultClubAdvisors = [
    {
      name: "",
      email: "",
      phoneNumber: "",
      employeeTitle: "",
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
    this.clubAdvisors = defaultClubAdvisors.slice(); // create a copy of defaultClubAdvisors

    // fill in club advisors
    for (let i = 0; i < json.advisors.length; i++) {
      if (i < this.clubAdvisors.length) {
        // Update existing advisor
        this.clubAdvisors[i].name = json.advisors[i].name;
        this.clubAdvisors[i].email = json.advisors[i].email;
        this.clubAdvisors[i].phoneNumber = json.advisors[i].phonenumber;
        this.clubAdvisors[i].employeeTitle = json.advisors[i].employeetitle;
      } else {
        // Add new advisor
        this.clubAdvisors.push({
          name: json.advisors[i].name,
          email: json.advisors[i].email,
          phoneNumber: json.advisors[i].phonenumber,
          employeeTitle: json.advisors[i].employeetitle
        });
      }
    }
    this.clubOfficers = defaultClubOfficers;
    // fill in club officers
    for (let i = 0; i < json.officers.length; i++) {
      for (let j = 0; j < this.clubOfficers.length; j++) {
        if (json.officers[i].role === this.clubOfficers[j].role) {
          this.clubOfficers[j].name = json.officers[i].name;
          this.clubOfficers[j].email = json.officers[i].email;
          this.clubOfficers[j].wNumber = json.officers[i].wnumber;
          this.clubOfficers[j].phoneNumber = json.officers[i].phonenumber;
          this.clubOfficers[j].major = json.officers[i].major;
          this.clubOfficers[j].gradeLevel = json.officers[i].gradelevel || this.clubOfficers[j].gradeLevel;
          this.clubOfficers[j].isUsed = json.officers[i].isused || this.clubOfficers[j].isRequired;
        }
      }
    }

    this.clubMembers = defaultMembers.slice(); // create a copy of defaultMembers

    // fill in club members
    for (let i = 0; i < json.members.length; i++) {
      if (i < this.clubMembers.length) {
        // Update existing member
        this.clubMembers[i].name = json.members[i].name;
        this.clubMembers[i].email = json.members[i].email;
        this.clubMembers[i].wNumber = json.members[i].wnumber;
      } else {
        // Add new member
        this.clubMembers.push({
          name: json.members[i].name,
          email: json.members[i].email,
          wNumber: json.members[i].wnumber
        });
      }
    }
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
      clubPresidentSignature: this.clubAgreement[0].signature,
      dateOfPresidentSignature: this.clubAgreement[0].date,
      clubAdvisorSignature: this.clubAgreement[1].signature,
      dateOfAdvisorSignature: this.clubAgreement[1].date,
      advisors: this.clubAdvisors.map((advisor) => {
        return {
          advisorID: advisor.advisorID,
          name: advisor.name,
          email: advisor.email,
          phoneNumber: advisor.phoneNumber,
          employeeTitle: advisor.employeeTitle,
        };
      }),
      officers: this.clubOfficers.map((officer) => {
        return {
          officerID: officer.officerID,
          role: officer.role,
          name: officer.name,
          email: officer.email,
          wNumber: officer.wNumber,
          phoneNumber: officer.phoneNumber,
          major: officer.major,
          gradeLevel: officer.gradeLevel,
          isUsed: officer.isUsed,
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