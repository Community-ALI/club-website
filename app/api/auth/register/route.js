// add an account to the database
export async function POST(request) {
    console.log(request);
    const data = { message: "Hello World!" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

