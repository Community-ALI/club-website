import utils from '@/app/utils.js';
import sendEmail from "@/app/utils.js/email";
import fs from "fs/promises";
import { sql } from "@vercel/postgres";

function generatePDF(json) {

}



// This route also emails the application to the specified email address.
export async function POST(request) {
    // user does not need to be logged in to submit an application
    const body = await request.json();
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
    try {
      sendEmail(
        'bschoolland@gmail.com',
        `${body.clubTitle} Application PDF`,
        `Dear Administrator,
      
        Please find attached the application for the club titled "${body.clubTitle}".
      
        Thank you for your time.
      
        Best regards,
        The Community Alis Team
      
        Note: This is an automated message. Please do not reply directly to this email.`,
        pdfBase64
      );
    } catch (err) {
      console.log(err);
      const data = { message: "Internal server error" };
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      });
    }
    // save the pdf to the database
    try {
      await sql`INSERT INTO ClubApplication (UserId, ClubTitle, ClubApplicationPDF) VALUES (${userId}, ${body.clubTitle}, ${pdfBase64})`;
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