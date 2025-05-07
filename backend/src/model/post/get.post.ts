import { pool } from "../../config/db/pool";

export const getPost = async (postId: number): Promise<any> => {

}

//todo get make user photo
export const getPostForFeed = async (): Promise<any> => {
    try {
        const data = await pool.query(`
            SELECT
                u.user_name,
                p.post_id,
                p.post_description,
                p.created_at,
                pi.image_url AS post_image_url,
                pv.video_url AS post_video_url
            FROM users u 
            JOIN post p ON p.user_id = u.user_id
            LEFT JOIN post_images pi ON p.post_id = pi.post_id
            LEFT JOIN post_videos pv ON p.post_id = pv.post_id
            ORDER BY p.created_at DESC
            LIMIT 10 OFFSET 0
        `);
        return data.rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}