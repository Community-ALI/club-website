import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// get the draft object from the database
export async function GET() {
  // check the headers for the JWT token
  const token = request.headers.get("Authorization");
  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }
  // verify the JWT token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // fetch the draft object from the database
    const drafts =
      await sql`SELECT * FROM ClubDraft WHERE UserId = ${decoded.userId}`;
    if (drafts.count === 0) {
      return new Response(JSON.stringify({ message: "Draft not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }
    const draft = drafts.fields[0];
    // Fetch related data
    const advisors =
      await sql`SELECT * FROM ClubAdvisors WHERE ClubID = ${draft.ClubID}`;
    const officers =
      await sql`SELECT * FROM ClubOfficers WHERE ClubID = ${draft.ClubID}`;
    const members =
      await sql`SELECT * FROM ClubMembers WHERE ClubID = ${draft.ClubID}`;

    const data = {
      message: "Success",
      draft: {
        ...draft,
        advisors: advisors.fields,
        officers: officers.fields,
        members: members.fields,
      },
    };
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

// update the draft object in the database
export async function POST(request) {
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

    // Update advisors
    if (advisors && advisors.length) {
      await sql`DELETE FROM ClubAdvisors WHERE ClubID = ${ClubID}`;
      for (const advisor of advisors) {
        await sql`
                INSERT INTO ClubAdvisors (ClubID, Name, Email, PhoneNumber)
                VALUES (${ClubID}, ${advisor.name}, ${advisor.email}, ${advisor.phoneNumber})
            `;
      }
    }

    // Update officers
    if (officers && officers.length) {
      await sql`DELETE FROM ClubOfficers WHERE ClubID = ${ClubID}`;
      for (const officer of officers) {
        await sql`
                INSERT INTO ClubOfficers (ClubID, Name, Email, PhoneNumber, Position, Major, GradeLevel)
                VALUES (${ClubID}, ${officer.name}, ${officer.email}, ${officer.phoneNumber}, ${officer.position}, ${officer.major}, ${officer.gradeLevel})
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
    console.log(data);
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
