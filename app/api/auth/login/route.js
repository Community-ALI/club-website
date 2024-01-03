import jwt from 'jsonwebtoken';
import { sql } from "@vercel/postgres";

const JWT_SECRET = 'your_secret_key'; // Replace with a secure key

export async function POST(request) {
    const body = await request.json();
    try {
        const result = await sql`SELECT * FROM USERS WHERE Email = ${body.email} AND Password = ${body.password}`;
        if (result.count === 0) {
            const data = { message: "Email or password incorrect" };
            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // User is valid, create a JWT token
        const token = jwt.sign({ email: body.email }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        const data = { message: "Success", token: token };
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.log(err);
        const data = { message: "Internal server error" };
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
