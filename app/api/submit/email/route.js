import sendEmail from "../../../utils.js/email.js";

export async function POST(request) {
  const body = await request.json();
  try {
    sendEmail(
      body.email,
      `${body.clubTitle} Application PDF`,
      `Dear Administrator,
    
      Please find attached the application for the club titled "${body.clubTitle}".
    
      Thank you for your time.
    
      Best regards,
      The Community Alis Team
    
      Note: This is an automated message. Please do not reply directly to this email.`,
      body.pdfBase64
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
}
