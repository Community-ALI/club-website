
import sendEmail from "../../utils/email.js";
import fs from "fs/promises";
import { sql } from "@vercel/postgres";
import puppeteer from "puppeteer";

async function generatePDF(data) {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // make the newpage look like the pdfComponent
    
    await page.setContent(data);

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, displayHeaderFooter: false, margin:{ top: "2cm"} });    
    await browser.close();
    // as a test, write the pdf to a file
    await fs.writeFile('./test.pdf', pdfBuffer);
    // convert the pdf buffer to base64
    const pdfBase64 = pdfBuffer.toString('base64');
    
    return pdfBase64;
}



// This route also emails the application to the specified email address.
export async function POST(request) {
    // user does not need to be logged in to submit an application
    const body = await request.json();
    const form = body.form;
    const html = body.html;
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
    const pdfBase64 = await generatePDF(html);
    console.log('pdf generated');
    // send the PDF to the specified email address
    try {
      sendEmail(
        'bschoolland@gmail.com',
        `${form.clubInformation.clubName} Application`,
        `Dear Administrator,
      
        Please find attached the application for the club titled "${form.clubInformation.clubName}".
      
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
      await sql`INSERT INTO ClubApplication (UserId, ClubTitle, ClubApplicationPDF) VALUES (${userId}, ${form.clubInformation.clubName}, ${pdfBase64})`;
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