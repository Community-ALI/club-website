import sendEmail from "@utils/email.js";

export async function POST(request) {
  const body = await request.json();
  const { email, subject, message } = body;
  try {
    console.log("Attempting to send email to", email);
    sendEmail(email, subject, message);
    const data = { message: "Email sent successfully" };
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
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