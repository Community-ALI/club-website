class RequiredDatapoint {
  constructor (name, type, condition) {
    this.name = name;
    this.type = type;
    this.condition = condition;
  }
  check (value) {
    if (this.type === "text") {
      if (this.condition === "not empty") {
        console.log(value);
        return value !== "";
      }
    }
  }
}

const requiredClubInformation = [
    new RequiredDatapoint("clubName", "text", "not empty"),
    new RequiredDatapoint("meetingDaysAndTime", "text", "not empty"),
    new RequiredDatapoint("meetingLocation", "text", "not empty"),
]; // TODO: contitionally require building and room number as well as zoom link


function checkClubInformation (clubData) {
    const info = clubData.clubInformation;
    const requiredFieldCount = requiredClubInformation.length;
    let filledFieldCount = 0;
    for (let i = 0; i < requiredFieldCount; i++) {
        if (requiredClubInformation[i].check(info[requiredClubInformation[i].name])) {
            filledFieldCount++;
        }    
    }
    let completionPercentage = (filledFieldCount / requiredFieldCount) * 100;
    console.log("Club Information: " + completionPercentage);
    return completionPercentage;
}

const numberOfRequiredAdvisors = 1;
const requiredClubAdvisors = [
    new RequiredDatapoint("name", "text", "not empty"),
    new RequiredDatapoint("email", "text", "not empty"),
    new RequiredDatapoint("phoneNumber", "text", "not empty"),
    // new RequiredDatapoint("Employee Title", "text", "not empty"),
];

function checkClubAdvisors (clubData) {
    const advisors = clubData.clubAdvisors;
    // advisors is an array of objects.  It can be any size, but it must have at least one object.
    // Each object must have the following properties: name, email, phoneNumber, employeeTitle
    if (advisors.length < numberOfRequiredAdvisors) {
        return 0;
    }
    let filledFieldCount = 0;
    const requiredFieldCount = requiredClubAdvisors.length * advisors.length;
    for (let i = 0; i < advisors.length; i++) {
        for (let j = 0; j < requiredClubAdvisors.length; j++) {
            if (requiredClubAdvisors[j].check(advisors[i][requiredClubAdvisors[j].name])) {
                filledFieldCount++;
            }
        }
    }
    let completionPercentage = (filledFieldCount / requiredFieldCount) * 100;
    console.log("Advisors: " + completionPercentage);
    return completionPercentage;
}

const numberOfRequiredOfficers = 2;
const requiredClubOfficers = [
    new RequiredDatapoint("name", "text", "not empty"),
    new RequiredDatapoint("email", "text", "not empty"),
    new RequiredDatapoint("phoneNumber", "text", "not empty"),
    new RequiredDatapoint("major", "text", "not empty"),
    new RequiredDatapoint("gradeLevel", "text", "not empty"),
];

function checkClubOfficers (clubData) {
    const officers = clubData.clubOfficers.filter((officer) => {
        return officer.isUsed;
    });
    console.log(officers);
    // officers is an array of objects.  It can be any size, but it must have at least one object.
    // Each object must have the following properties: name, email, phoneNumber, major, gradeLevel
    if (officers.length < numberOfRequiredOfficers) {
        return 0;
    }
    let filledFieldCount = 0;
    const requiredFieldCount = requiredClubOfficers.length * officers.length;
    for (let i = 0; i < officers.length; i++) {
        for (let j = 0; j < requiredClubOfficers.length; j++) {
            if (requiredClubOfficers[j].check(officers[i][requiredClubOfficers[j].name])) {
                filledFieldCount++;
            }
        }
    }
    let completionPercentage = (filledFieldCount / requiredFieldCount) * 100;
    console.log("Officers: " + completionPercentage);
    return completionPercentage;
}

export default function updateCompletionPercentage (clubData, sections, setSections) {
    // for each section, set the completion percentage
    let newSections = sections;
    newSections[0].progress = checkClubInformation(clubData);
    newSections[1].progress = checkClubAdvisors(clubData);
    newSections[2].progress = checkClubOfficers(clubData);
    setSections(newSections);
}