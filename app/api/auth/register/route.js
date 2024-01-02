import { sql } from "@vercel/postgres";

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


    const data = { message: result };
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

