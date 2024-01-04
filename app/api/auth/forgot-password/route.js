// sends a password reset email to the email address specified in the request body

import { sql } from "@vercel/postgres";
import sendEmail from "../../../utils.js/email.js";
const crypto = require("crypto");


//Function to generate a cryptographically secure random token
function generateRandomToken(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString("hex");
        resolve(token);
      }
    });
  });
}

export async function POST(request) {
    const body = await request.json();
    try {
        const result = await sql`SELECT * FROM USERS WHERE Email = ${body.email}`;
        if (result.count === 0) {
            // Don't let the user know if the email exists or not for security reasons
            const data = { message: "Email sent if it exists" };
            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // Email exists, send a password reset email
        const token = await generateRandomToken(32); 
        sendEmail(body.email, "Password Reset", `Click this link to reset your password: ${process.env.URL}#resetPassword?token=${token}&email=${body.email}`);
        // make the token expire in 1 hour
        const expireTime = new Date();
        expireTime.setHours(expireTime.getHours() + 1);
        // store the token in the database
        await sql`UPDATE USERS SET Password_reset_token = ${token}, Password_reset_token_expiration = ${expireTime} WHERE Email = ${body.email}`;
        const data = { message: "Email sent if it exists" };
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
            },
            status: 500
        });
    }
}

