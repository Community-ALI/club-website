function MyComponent() {
  // the JSON object that will be used to populate the PDF
  const form = {
    "clubInformation": {
        "clubName": "test",
        "meetingDaysAndTime": "test2",
        "meetingLocation": "Both",
        "buildingAndRoomNumber": "adgadsgasdg",
        "zoomLink": "adsgasdgasdg"
    },
    "clubAdvisors": [
        {
            "name": "test",
            "email": "adgasd",
            "phoneNumber": "aaa",
            "title": "aaa"
        }
    ],
    "clubOfficers": [
        {
            "role": "Club President",
            "name": "test",
            "email": "asdgadsg",
            "wNumber": "dsgadasg",
            "phoneNumber": "adsgdsag",
            "major": "adsgdsga",
            "gradeLevel": "Freshman (1st Year)"
        },
        {
            "role": "ICC Representative",
            "name": "asdgasdg",
            "email": "sadgdsa",
            "wNumber": "dsaggsda",
            "phoneNumber": "adsgsdag",
            "major": "asdgdsag",
            "gradeLevel": "Senior (4th Year)"
        },
        {
            "role": "Club Vice President",
            "placeholder": "This club does not have a Club Vice President"
        },
        {
            "role": "Club Secretary",
            "name": "asdgsdgag",
            "email": "asdgsdag",
            "wNumber": "asdgsdag",
            "phoneNumber": "dsagasdg",
            "major": "dgsadsg",
            "gradeLevel": "5+ Years"
        },
        {
            "role": "Club Treasurer",
            "placeholder": "This club does not have a Club Treasurer"
        },
        {
            "role": "Club Social Media Manager",
            "name": "asdfasd",
            "email": "asdsad",
            "wNumber": "dsadsa",
            "phoneNumber": "fgff",
            "major": "ffffffffff",
            "gradeLevel": "Junior (3rd Year)"
        }
    ],
    "clubMembers": [
        {
            "name": "adfasdg",
            "email": "adsgsadgsa",
            "wNumber": "0917714"
        },
        {
            "name": "adsg",
            "email": "adsfg",
            "wNumber": "asdgfhgjm,.k"
        },
        {
            "name": "adfsfdas",
            "email": "fdsadfas",
            "wNumber": "jhgfds"
        },
        {
            "name": "dsafgfdhh",
            "email": "fasddfsadsaf",
            "wNumber": "hgfds"
        },
        {
            "name": "ghdjfkglh;",
            "email": "FDGZHxjkfl",
            "wNumber": " vgt"
        }
    ],
    "clubAgreement": [
        {
            "role": "Club President",
            "signature": "test",
            "date": "123"
        },
        {
            "role": "Club Advisor",
            "signature": "testtaketwo",
            "date": "234"
        }
    ]
}
  return (
    <div>
      <h1>
        {form.clubInformation.clubName}
      </h1>
      <p>{form.clubInformation.meetingDaysAndTime}</p>

      {/* map all the officers */}
      {form.clubOfficers.map((officer) => (
        <div class = 'officer'>
          <h2>{officer.role}</h2>
          <p>{officer.name}</p>
          <p>{officer.email}</p>
          <p>{officer.wNumber}</p>
          <p>{officer.phoneNumber}</p>
          <p>{officer.major}</p>
          <p>{officer.gradeLevel}</p>
        </div>
      ))}

      {/* map all the members */}
    </div>
  );
}

export default MyComponent;
