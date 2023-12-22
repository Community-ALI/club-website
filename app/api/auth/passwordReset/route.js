// sends a password reset email to the email address specified in the request body
export async function POST(request) {
    console.log(request);
    const data = { message: "Hello World!" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}