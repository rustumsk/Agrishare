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
            COALESCE(json_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '[]') AS images,
            COALESCE(json_agg(DISTINCT pv.video_url) FILTER (WHERE pv.video_url IS NOT NULL), '[]') AS videos
        FROM post p
        JOIN users u ON u.user_id = p.user_id
        LEFT JOIN post_images pi ON pi.post_id = p.post_id
        LEFT JOIN post_videos pv ON pv.post_id = p.post_id
        GROUP BY p.post_id, u.user_name
        ORDER BY p.created_at DESC
        LIMIT 10 OFFSET 0
        `);
        return data.rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}