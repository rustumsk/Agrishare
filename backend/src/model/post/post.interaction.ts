import { pool } from "../../config/db/pool"

export const likePost = async (post_id: any, user_id: any) => {
  try {
    await pool.query(
      `INSERT INTO post_likes(post_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [post_id, user_id]
    );
    console.log("Post liked!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const unlikePost = async (post_id: any, user_id: any) => {
  try {
    await pool.query(
      `DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2`,
      [post_id, user_id]
    );
    console.log("Post unliked!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const commentPost = async(post_id:string | number, user_id:string | number, comment:string) =>{
  try{
    await pool.query(
      `INSERT INTO post_comments(post_id, user_id, content) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,[post_id,user_id,comment]
    );
    console.log("Post commented!");
  }catch(e){
    console.log(e);
    throw e;
  }
}

export const sendNotif = async (user_id: any, type: any, text:any = " ") => {
  try {
    await pool.query(
      `INSERT INTO notifications(user_id, type, message) VALUES ($1, $2, $3)`,
      [user_id, type, text]
    );
    console.log("Notification sent!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getNotifs = async (user_id: any) => {
  try {
    const result = await pool.query(
      `SELECT type, created_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
