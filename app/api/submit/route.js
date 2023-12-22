// the submit route. This route will be used to turn a draft into a full application.
// This route also emails the application to the specified email address.
export async function POST(request) {
    console.log(request);
    const data = { message: "Hello World!" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
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
