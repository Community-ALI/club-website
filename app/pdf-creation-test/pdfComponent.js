function MyComponent() {
  // the JSON object that will be used to populate the PDF
  const form = {
    clubInformation: {
      clubName: "MJC Business Club",
      meetingDaysAndTime: "Every Tuesday and Friday at 9am",
      meetingLocation: "Both",
      buildingAndRoomNumber: "Center of Advanced Tech Room 213",
      zoomLink:
        "https://us02web.zoom.us/j/86540662672?pwd=TWYxL3VENlM2TmhiYndiKy9QaHZndz09",
    },
    clubAdvisors: [
      {
        name: "Leslie Vaughn",
        email: "LeslieVaughn@yosemite.edu",
        phoneNumber: "(209)-505-3894",
        title: "Business Professor",
      },
    ],
    clubOfficers: [
      {
        role: "Club President",
        name: "Adrean Cajigas",
        email: "adrean964837@my.yosemite.edu",
        wNumber: "964837",
        phoneNumber: "(209)-505-3894",
        major: "Computer Science",
        gradeLevel: "Freshman (1st Year)",
      },
      {
        role: "ICC Representative",
        name: "Benjamin Schoolland",
        email: "benjamin849082@my.yosemite.edu",
        wNumber: "894249",
        phoneNumber: "(209)-690-69420",
        major: "Computer Science",
        gradeLevel: "Senior (4th Year)",
      },
      {
        role: "Club Vice President",
        placeholder: "This club does not have a Club Vice President",
      },
      {
        role: "Club Secretary",
        name: "Kirill Kovalenko",
        email: "kirill123456@my.yosemite.edu",
        wNumber: "123456",
        phoneNumber: "(209)-231-5431",
        major: "Business Administration",
        gradeLevel: "5+ Years",
      },
      {
        role: "Club Treasurer",
        placeholder: "This club does not have a Club Treasurer",
      },
      {
        role: "Club Social Media Manager",
        placeholder: "This club does not have a Club Treasurer",
      },
    ],
    clubMembers: [
      {
        name: "adfasdg",
        email: "adsgsadgsa",
        wNumber: "0917714",
      },
      {
        name: "adsg",
        email: "adsfg",
        wNumber: "asdgfhgjm,.k",
      },
      {
        name: "adfsfdas",
        email: "fdsadfas",
        wNumber: "jhgfds",
      },
      {
        name: "dsafgfdhh",
        email: "fasddfsadsaf",
        wNumber: "hgfds",
      },
      {
        name: "ghdjfkglh;",
        email: "FDGZHxjkfl",
        wNumber: " vgt",
      },
    ],
    clubAgreement: [
      {
        role: "Club President",
        signature: "test",
        date: "123",
      },
      {
        role: "Club Advisor",
        signature: "testtaketwo",
        date: "234",
      },
    ],
  };
  return (
    <div class="pdf">
      <h1>{form.clubInformation.clubName}</h1>

      <div class="info">
        <h2 class="section-title">Club Information</h2>

        <div class="container">
          <h2 class="header">Meeting Days and Time:</h2>
          <p class="data">{form.clubInformation.meetingDaysAndTime}</p>
        </div>

        <div class="container">
          <h2 class="header">Meeting Location:</h2>
          <p class="data">{form.clubInformation.buildingAndRoomNumber}</p>
        </div>

        <div class="container">
          <h2 class="header">Zoom Link:</h2>
          <p class="data" id="link">
            {form.clubInformation.zoomLink}
          </p>
        </div>
      </div>

      {form.clubAdvisors.map((advisor) => (
        <div class="advisor">
          <h2 class="section-title">Club Advisor</h2>

          <div class="container">
            <h2 class="header">Name:</h2>
            <p class="data">{advisor.name}</p>
          </div>

          <div class="container">
            <h2 class="header">Email:</h2>
            <p class="data">{advisor.email}</p>
          </div>

          <div class="container">
            <h2 class="header">Phone Number:</h2>
            <p class="data">{advisor.phoneNumber}</p>
          </div>

          <div class="container">
            <h2 class="header">Faculty Title:</h2>
            <p class="data">{advisor.title}</p>
          </div>
        </div>
      ))}

      {/* map all the officers */}
      {form.clubOfficers.map((officer) => (
        <div class="officer">
          <h2 class="section-title">{officer.role}</h2>

          <div class="container">
            <h2 class="header">Name:</h2>
            <p class="data">{officer.name}</p>
          </div>

          <div class="container">
            <h2 class="header">Email:</h2>
            <p class="data">{officer.email}</p>
          </div>

          <div class="container">
            <h2 class="header">W Number:</h2>
            <p class="data">{officer.wNumber}</p>
          </div>

          <div class="container">
            <h2 class="header">Major:</h2>
            <p class="data">{officer.major}</p>
          </div>

          <div class="container">
            <h2 class="header">Grade Level:</h2>
            <p class="data">{officer.gradeLevel}</p>
          </div>

          <p class="data">{officer.placeholder}</p>
        </div>
      ))}

      {/* map all the members */}
    </div>
  );
}

export default MyComponent;
