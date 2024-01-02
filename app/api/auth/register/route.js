import { sql } from "@vercel/postgres";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key'; // Replace with a secure key

export async function GET(request) {
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

// add an account to the database
export async function POST(request) {
    const body = await request.json();
    console.log(body);
    try{
        const result = await sql `INSERT INTO USERS (Email, Password, Club_name) VALUES (${body.email}, ${body.password}, ${body.club_name})`;
    }
    catch(err){
        console.log(err);
        // if it is a duplicate key error, send a different message
        if(err.code === "23505"){
            const data = { message: "Email already in use" };
            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        const data = { message: "Internal server error" };
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const data = { message: "Account Created" };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

