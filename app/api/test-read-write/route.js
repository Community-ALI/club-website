import { sql } from "@vercel/postgres";
// Get returns all users
export async function GET() {
    try {
        const data = await sql `SELECT * FROM USERS`;
        // remove the password from the response for obvious reasons
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Post adds a user to the database
export async function POST(request) {
    try {
        const body = await request.json();

        await sql `INSERT INTO USERS (Email, Password, Club_name) VALUES (${body.email}, ${body.password}, ${body.club_name})`;
        const data = { message: "Success" };
        console.log('new user added');
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ message: "Error" }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
