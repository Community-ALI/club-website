// the submit route. This route will be used to turn a draft into a full application.

// saves the final application to the database (similar to the draft route)
function saveSubmission(json) {

}

function generatePDF(json) {

}



// This route also emails the application to the specified email address.
export async function POST(request) {
    // user does not need to be logged in to submit an application
    const body = await request.json();
    console.log('received application: ' + JSON.stringify(body));
    let userId = null;
    // check the headers for the JWT token, if it exists, use the user id
    const tokenHeader = request.headers.get("Authorization");
    if (tokenHeader) {
      // remove the 'Bearer ' prefix from the token
      const token = tokenHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    }
    // FIXME: generate the PDF from the application data

    // FIXME: send the email

    // FIXME: save the application to the database

    // FIXME: delete the draft from the database
    
    const data = { message: "Success"}; 
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
}

// Get sends a preview PDF of the application to the user
export async function GET() {
    const data = { message: "Hello World!" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}



// FOR REFERENCE
async function POSTfromDraft(request) {
    const body = await request.json();
    // check the headers for the JWT token
    const tokenHeader = request.headers.get("Authorization");
    // remove the 'Bearer ' prefix from the token
    console.log(tokenHeader);
    if (!tokenHeader) {
      console.log("No token");
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
    // extract the token from the header
    const token = tokenHeader.split(" ")[1];
    try {
      console.log("Verifying token");
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      const userId = decoded.id;
      if (!userId) {
        console.log("No userId");
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
          headers: { "Content-Type": "application/json" },
          status: 401,
        });
      }
      console.log('userId: ' + userId);
      // fetch the draft object from the database
      const existingDraft =
        await sql`SELECT ClubID FROM ClubDraft WHERE UserId = ${userId}`;
      let ClubID;
      if (existingDraft.rowCount === 0) {
        // If no draft exists, create a new one
        console.log("Creating new draft");
        const newDraft = await sql`
      INSERT INTO ClubDraft (UserId, ClubName, MeetingDaysTimes, MeetingLocation, BuildingRoomNumber, ZoomLink, ClubPresidentSignature, DateOfPresidentSignature, ClubAdvisorSignature, DateOfAdvisorSignature)
      VALUES (${userId}, ${body.clubName}, ${body.meetingDaysTimes}, ${body.meetingLocation}, ${body.buildingRoomNumber}, ${body.zoomLink}, ${body.clubPresidentSignature}, ${body.dateOfPresidentSignature}, ${body.clubAdvisorSignature}, ${body.dateOfAdvisorSignature})
      RETURNING ClubID`;
        ClubID = newDraft.rows[0].clubid;
      } else {
        console.log("Updating existing draft");
        // If a draft already exists, update it
        ClubID = existingDraft.rows[0].clubid;
        await sql`
              UPDATE ClubDraft 
              SET 
                  ClubName = ${body.clubName},
                  MeetingDaysTimes = ${body.meetingDaysTimes},
                  MeetingLocation = ${body.meetingLocation},
                  BuildingRoomNumber = ${body.buildingRoomNumber},
                  ZoomLink = ${body.zoomLink},
                  ClubPresidentSignature = ${body.clubPresidentSignature},
                  DateOfPresidentSignature = ${body.dateOfPresidentSignature},
                  ClubAdvisorSignature = ${body.clubAdvisorSignature},
                  DateOfAdvisorSignature = ${body.dateOfAdvisorSignature}
              WHERE UserId = ${userId}
              RETURNING *`;
      }
      console.log("ClubID: " + ClubID);
      // Assuming body contains 'advisors', 'officers', and 'members' fields
      const { advisors, officers, members } = body;
      console.log('clubJSON: ' + JSON.stringify(body));
      // Update advisors
      if (advisors && advisors.length) {
        await sql`DELETE FROM ClubAdvisors WHERE ClubID = ${ClubID}`;
        for (const advisor of advisors) {
          await sql`
                  INSERT INTO ClubAdvisors (ClubID, Name, Email, PhoneNumber, EmployeeTitle)
                  VALUES (${ClubID}, ${advisor.name}, ${advisor.email}, ${advisor.phoneNumber}, ${advisor.employeeTitle})
              `;
        }
      }
      // Update officers
      if (officers && officers.length) {
        await sql`DELETE FROM ClubOfficers WHERE ClubID = ${ClubID}`;
        for (const officer of officers) {
          await sql`
                  INSERT INTO ClubOfficers (ClubID, Role, Name, Email, wNumber, PhoneNumber, Major, GradeLevel, IsUsed)
                  VALUES (${ClubID}, ${officer.role}, ${officer.name}, ${officer.email}, ${officer.wNumber}, ${officer.phoneNumber}, ${officer.major}, ${officer.gradeLevel}, ${officer.isUsed})
              `;
        }
      }
  
      // Update members
      if (members && members.length) {
        await sql`DELETE FROM ClubMembers WHERE ClubID = ${ClubID}`;
        for (const member of members) {
          await sql`
                  INSERT INTO ClubMembers (ClubID, Name, Email, WNumber)
                  VALUES (${ClubID}, ${member.name}, ${member.email}, ${member.wNumber})
              `;
        }
      }
      const data = { message: "Success"};
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  }
  