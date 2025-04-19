import { pool } from "../../config/db/pool";
import { Post } from "../../config/types/types";

export const createPostModel = async (post: Post, user_id: string): Promise<number> => {
    try{
        const result = await pool.query(
            `INSERT INTO post (user_id, post_description) VALUES ($1, $2) RETURNING post_id`,
            [user_id, post.post_description]
        );
        return result.rows[0].post_id;
    }catch(e){
        console.log(e);
        throw(e);
    };
};