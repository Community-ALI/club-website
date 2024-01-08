import { sql } from "@vercel/postgres";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
// get the draft object from the database
export async function GET() { 
    // check the headers for the JWT token
    const token = request.headers.get('Authorization');
    if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }
    // verify the JWT token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // fetch the draft object from the database
        const result = await sql`SELECT * FROM DRAFTS WHERE Email = ${decoded.email}`;
        if (result.count === 0) {
            return new Response(JSON.stringify({ message: "Draft not found" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        const data = { message: "Success", draft: result.rows[0] };
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

// update the draft object in the database
export async function POST(request) {
    console.log(request);
    const data = { message: "Hello World!" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}