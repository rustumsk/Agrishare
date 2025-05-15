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

export const getMessages = async (sender_id: any, receiver_id: any) => {
  try {
    const result = await pool.query(
      `SELECT
          message_id,
          sender_id,
          receiver_id,
          content,
          created_at
        FROM messages
        WHERE (sender_id = $1 AND receiver_id = $2)
           OR (sender_id = $2 AND receiver_id = $1)
        ORDER BY created_at ASC;`,
      [sender_id, receiver_id]
    );
    return result.rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
}