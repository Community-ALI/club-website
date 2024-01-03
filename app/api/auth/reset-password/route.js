import { sql } from "@vercel/postgres";
const bcrypt = require('bcrypt');

export async function POST(request) {
    const body = await request.json();
    const token = body.token;
    const email = body.email;
    const newPassword = body.password;

    try {
        // Verify the token and check expiration
        const result = await sql`SELECT * FROM USERS WHERE Email = ${email} AND Password_reset_token = ${token} AND Password_reset_token_expiration > CURRENT_TIMESTAMP`;
        if (result.count === 0) {
            return new Response(JSON.stringify({ message: "Invalid or expired token" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

        // Update the password and invalidate the token
        await sql`
            UPDATE USERS 
            SET Password = ${hashedPassword}, Password_reset_token = NULL, Password_reset_token_expiration = NULL 
            WHERE Email = ${email}`;

        return new Response(JSON.stringify({ message: "Password updated successfully" }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
