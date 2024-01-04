import { sql } from "@vercel/postgres";
const bcrypt = require('bcrypt');

export async function POST(request) {
    const body = await request.json();
    const token = body.token;
    const email = body.email;
    const newPassword = body.password;
    try {
        console.log('attempting to reset password for ' + email + ' with token ' + token)
        // Check if the token is valid
        const result = await sql`SELECT * FROM USERS WHERE Email = ${email} AND Password_reset_token = ${token}`;

        if (result.rowCount === 0 || result.rowCount === undefined) {
            return new Response(JSON.stringify({ message: "Invalid token" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            });
        }
        // check if the token is expired
        const currentTime = new Date();
        if (currentTime > result.rows[0].password_reset_token_expiration) {
            return new Response(JSON.stringify({ message: "Expired token" }), {
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
