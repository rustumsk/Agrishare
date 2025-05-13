import { pool } from "../../config/db/pool";

export const messageUser = async(sender_id: number| string, receiver_id: number| string, content: string) => {
    try{
        await pool.query(
            `INSERT INTO messages(sender_id, receiver_id, content) VALUES ($1, $2, $3)`,
            [sender_id, receiver_id, content]
        );
        console.log("Message sent!");
    }catch(e){
        console.log(e);
        throw(e);
    }
}