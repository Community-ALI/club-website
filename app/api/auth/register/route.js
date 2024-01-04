import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';

export async function POST(request) {
    const body = await request.json();

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the number of salt rounds

        // Insert the user into the database with the hashed password
        await sql`INSERT INTO USERS (Email, Password, Club_name) VALUES (${body.email}, ${hashedPassword}, ${body.club_name})`;

        return new Response(JSON.stringify({ message: "Account Created" }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        // Handle duplicate key error
        if (err.code === "23505") {
            return new Response(JSON.stringify({ message: "Email already in use" }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        // Handle other errors
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
