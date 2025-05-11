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