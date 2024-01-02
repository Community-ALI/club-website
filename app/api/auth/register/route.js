// add an account to the database
export async function POST(request) {
    const body = await request.json();
    console.log(body);
    const data = { message: "Hello World!" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

