import jwt from 'jsonwebtoken';
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
    const body = await request.json();
    try {
        // Fetch the user's hashed password from the database
        const result = await sql`SELECT * FROM USERS WHERE Email = ${body.email}`;
        if (result.count === 0) {
            return new Response(JSON.stringify({ message: "Email or password incorrect" }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        // Compare the provided password with the hashed password
        const isValidPassword = await bcrypt.compare(body.password, result.rows[0].password);
        if (!isValidPassword) {
            return new Response(JSON.stringify({ message: "Email or password incorrect" }), {
                headers: { 'Content-Type': 'application/json' }
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
        console.error(err);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
