import sendEmail from "@/app/utils.js/email";
import fs from "fs/promises";
import { sql } from "@vercel/postgres";

function generatePDF(json) {

}



// This route also emails the application to the specified email address.
export async function POST(request) {
    // user does not need to be logged in to submit an application
    // const body = await request.json();
    const body = {
      clubInformation: {
        clubName: 'test',
        meetingDaysAndTime: 'test2',
        meetingLocation: 'Both',
        buildingAndRoomNumber: 'test',
        zoomLink: 'test'
      },
      clubAdvisors: [
        { name: 'test', email: 'adgasd', phoneNumber: 'aaa', title: 'aaa' }
      ],
      clubOfficers: [
        {
          role: 'Club President',
          name: 'test',
          email: 'asdgadsg',
          wNumber: 'dsgadasg',
          phoneNumber: 'adsgdsag',
          major: 'adsgdsga',
          gradeLevel: 'Freshman (1st Year)'
        },
        {
          role: 'ICC Representative',
          name: 'asdgasdg',
          email: 'sadgdsa',
          wNumber: 'dsaggsda',
          phoneNumber: 'adsgsdag',
          major: 'asdgdsag',
          gradeLevel: 'Senior (4th Year)'
        },
        {
          role: 'Club Vice President',
          placeholder: 'This club does not have a Club Vice President'
        },
        {
          role: 'Club Secretary',
          name: 'asdgsdgag',
          email: 'asdgsdag',
          wNumber: 'asdgsdag',
          phoneNumber: 'dsagasdg',
          major: 'dgsadsg',
          gradeLevel: '5+ Years'
        },
        {
          role: 'Club Treasurer',
          placeholder: 'This club does not have a Club Treasurer'
        },
        {
          role: 'Club Social Media Manager',
          name: 'asdfasd',
          email: 'asdsad',
          wNumber: 'dsadsa',
          phoneNumber: 'fgff',
          major: 'ffffffffff',
          gradeLevel: 'Junior (3rd Year)'
        }
      ],
      clubMembers: [
        { name: 'adfasdg', email: 'adsgsadgsa', wNumber: '0917714' },
        { name: 'adsg', email: 'adsfg', wNumber: 'asdgfhgjm,.k' },
        { name: 'adfsfdas', email: 'fdsadfas', wNumber: 'jhgfds' },
        { name: 'dsafgfdhh', email: 'fasddfsadsaf', wNumber: 'hgfds' },
        {
          name: 'ghdjfkglh;',
          email: 'FDGZHxjkfl',
          wNumber: 'dsaousdoufha'
        }
      ],
      clubAgreement: [
        { role: 'Club President', signature: 'aaa', date: 'asdfasdf' },
        {
          role: 'Club Advisor',
          signature: 'dsfafdas',
          date: 'adsasdfsdaf'
        }
      ]
    };
    console.log(body);
    console.log('application received');
    let userId = -1;
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
    // for now, send ./sample.pdf
    const pdfBase64 = await fs.readFile("./app/api/submit/sample.pdf", "base64");
    console.log('pdf generated');
    // send the PDF to the specified email address
    // try {
    //   sendEmail(
    //     'bschoolland@gmail.com',
    //     `${body.clubInformation.clubName} Application`,
    //     `Dear Administrator,
      
    //     Please find attached the application for the club titled "${body.clubInformation.clubName}".
      
    //     Thank you for your time.
      
    //     Best regards,
    //     The Community Alis Team
      
    //     Note: This is an automated message. Please do not reply directly to this email.`,
    //     pdfBase64
    //   );
    // } catch (err) {
    //   console.log(err);
    //   const data = { message: "Internal server error" };
    //   return new Response(JSON.stringify(data), {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     status: 500,
    //   });
    // }
    // save the pdf to the database
    try {
      await sql`INSERT INTO ClubApplication (UserId, ClubTitle, ClubApplicationPDF) VALUES (${userId}, ${body.clubInformation.clubName}, ${pdfBase64})`;
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }

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