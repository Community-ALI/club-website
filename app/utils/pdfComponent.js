function PDFComponent(props) {
  const currentDate = new Date().toLocaleDateString();
  let advisorCounter = 0;
  let memberCounter = 0;

  
  const form = props.form;
  return (
    <div class="pdf">
      <h1>{form.clubInformation.clubName}</h1>
      <p class="date">{`Date Submitted: ${currentDate}`}</p>

      <div class="info">
        <h2 class="section-title">Club Information</h2>

        <div class="container">
          <h2 class="header">Meeting Days and Time:</h2>
          <p class="data">{form.clubInformation.meetingDaysAndTime}</p>
        </div>

        {/* if the club has a meeting location, display it */}
        {form.clubInformation.buildingAndRoomNumber !== "" ? (
          <div class="container">
            <h2 class="header">Meeting Location:</h2>
            <p class="data">{form.clubInformation.buildingAndRoomNumber}</p>
          </div>
        ) : (
          <></>
        )}

        {/* if the club has a zoom link, display it */}
        {form.clubInformation.zoomLink !== "" ? (
          <div class="container">
            <h2 class="header">Zoom Link:</h2>
            <p class="data">{form.clubInformation.zoomLink}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <hr class="section-line"></hr>

      {/* map all the advisors */}
      {form.clubAdvisors.map((advisor) => {
        advisorCounter++;

        return (
          <div class="section" key={`advisor-${advisorCounter}`}>
            <h2 class="section-title">Club Advisor #{advisorCounter}</h2>

            <div class="divider-row">
              <div class="divider-column">
                <div class="container">
                  <h2 class="header">Name:</h2>
                  <p class="data">{advisor.name}</p>
                </div>

                <div class="container">
                  <h2 class="header">Email:</h2>
                  <p class="data">{advisor.email}</p>
                </div>
              </div>

              <div class="divider-column">
                <div class="container">
                  <h2 class="header">Phone Number:</h2>
                  <p class="data">{advisor.phoneNumber}</p>
                </div>

                <div class="container">
                  <h2 class="header">Faculty Title:</h2>
                  <p class="data">{advisor.title}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <hr class="section-line"></hr>

      {/* map all the officers */}
      {form.clubOfficers.map((officer, index) => (
        <div class="section" key={index}>
          <h2 class="section-title">{officer.role}</h2>

          {officer.placeholder ? (
            <p class="placeholder">{officer.placeholder}</p>
          ) : (
            <div class="divider-row">
              <div class="divider-column">
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
              </div>

              <div class="divder-column">
                <div class="container">
                  <h2 class="header">Major:</h2>
                  <p class="data">{officer.major}</p>
                </div>

                <div class="container">
                  <h2 class="header">Grade Level:</h2>
                  <p class="data">{officer.gradeLevel}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <hr class="section-line"></hr>

      {/* map all the members */}
      {form.clubMembers.map((member) => {
        memberCounter++;

        return (
          <div class="section" key={`advisor-${memberCounter}`}>
            <h2 class="section-title">Club Member #{memberCounter}</h2>

            <div class="divider-row">
              <div class="divider-column">
                <div class="container">
                  <h2 class="header">Name:</h2>
                  <p class="data">{member.name}</p>
                </div>

                <div class="container">
                  <h2 class="header">Email:</h2>
                  <p class="data">{member.email}</p>
                </div>
              </div>
              <div class="divider-column">
                <div class="container">
                  <h2 class="header">W Number:</h2>
                  <p class="data">{member.wNumber}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <hr class="section-line"></hr>

      <div class="section">
        <h2 class="section-title">Club Agreement Signature</h2>

        <div class="agreement">
          The membership of the <b>{form.clubInformation.clubName}</b>{" "}
          {`has
          agreed to abide by the Inter-Club Council's Standing Orders and the
          ASMJC Constitution and Bylaws. We are aware of and agree and abide by
          the following rights, privileges, and responsibilities:`}
          <br></br>
          <br></br>
          1. We must attend all Inter Club Council Meetings. If we are absent
          from one consecutive meeting, our active status shall be suspended and
          our funds will be frozen. Meetings are held the second Friday of the
          month from 1-2pm in the East Campus Student Center on Feb 9th, March
          8th, and April 12th.
          <br></br>
          <br></br>
          2.If our club is inactive for two consecutive semesters, all club
          funds and assets shall be absorbed into the ASMJC club development
          fund.
          <br></br>
          <br></br>
          3. We shall ensure that all records pertaining to our club, including
          but not limited to our Constitution and Bylaws, Officer Roster, and
          Membership Roster will be kept updated and we shall promptly inform
          the Club Coordinator of any changes.
          <br></br>
          <br></br>
          4. All club funds shall be kept in an on-campus account in the
          Business Office under the support of ASMJC.
          <br></br>
          <br></br>
          5. We must have an active Advisor who attends all club functions and
          verifies officer eligibility.
          <br></br>
          <br></br>
          6. Club officers must maintain a 2.0 grade point average or higher to
          hold office.
          <br></br>
          <br></br>
          7. Club officers must be enrolled in 5 units to hold office.
        </div>
      </div>

      {/* map the agreements */}
      <div class="divider-row">
        {form.clubAgreement.map((agreements, index) => (
          <div key={index} class="divider-column">
            <div class="container">
              <h2 class="header">{agreements.role}:</h2>
              <p class="data">{agreements.signature}</p>
            </div>
          </div>
        ))}
      </div>

      <footer class="footer">
        <h2>Thank you for using the MJC Club Application Website!</h2>
        <p class="author">
          Created by Adrean Cajigas, Benjamin Schoolland, and Mason Partridge
        </p>
      </footer>
    </div>
  );
}

export default PDFComponent;
