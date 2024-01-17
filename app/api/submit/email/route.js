import sendEmail from "../../../utils.js/email.js";

export async function POST(request) {
  const body = await request.json();
  try {
    sendEmail(
      body.email,
      `${body.clubTitle} Application PDF`,
      `honestly idk what to put here. but here's the link to the pdf:`,
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
