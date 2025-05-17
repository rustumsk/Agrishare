import { pool } from "../../config/db/pool";

export const getPost = async (postId: number): Promise<any> => {

}

//todo get make user photo
export const getPostForFeed = async (currentUserId: any): Promise<any> => {
    try {
        const result = await pool.query(
            `
            SELECT 
                p.post_id,
                p.post_description,
                p.user_id,
                p.created_at,
                u.user_name,
                u.image_url AS user_image,

                COUNT(DISTINCT pl.like_id) AS like_count,
                COUNT(DISTINCT pc.comment_id) AS comment_count,

                COALESCE(
                    JSON_AGG(DISTINCT pi.image_url)
                    FILTER (WHERE pi.image_url IS NOT NULL),
                    '[]'
                ) AS images,

                COALESCE(
                    JSON_AGG(DISTINCT pv.video_url)
                    FILTER (WHERE pv.video_url IS NOT NULL),
                    '[]'
                ) AS videos,

                EXISTS (
                    SELECT 1
                    FROM post_likes pl2
                    WHERE pl2.post_id = p.post_id AND pl2.user_id = $1
                ) AS liked_by_user

            FROM post p
            JOIN users u ON u.user_id = p.user_id
            LEFT JOIN post_images pi ON pi.post_id = p.post_id
            LEFT JOIN post_videos pv ON pv.post_id = p.post_id
            LEFT JOIN post_likes pl ON pl.post_id = p.post_id
            LEFT JOIN post_comments pc ON pc.post_id = p.post_id

            GROUP BY p.post_id, p.user_id, u.user_name, u.image_url
            ORDER BY p.created_at DESC
            LIMIT 10 OFFSET 0
            `,
            [currentUserId]
        );
        return result.rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const getPostComments = async (postId: number) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.comment_id,
        c.content,
        c.created_at,
        u.user_id,
        u.user_name,
        u.image_url
      FROM post_comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [postId]);

    return result.rows;
  } catch (error) {
    console.error("Error fetching post comments:", error);
    throw error;
  }
};

export const getPostLikes = async (postId: number) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        COUNT(*) AS like_count
      FROM post_likes
      WHERE post_id = $1
      `,
      [postId]
    );

    return result.rows[0].like_count;
  } catch (error) {
    console.error("Error getting post likes:", error);
    throw error;
  }
};

export const getUserBlogsAndPosts = async () => {
  const SQL = `
    SELECT
      'blog' AS type,
      b.blog_id AS id,
      b.user_id,
      u.user_name AS author,
      b.blog_title AS title,
      b.blog_slug AS slug,
      b.blog_description AS description,
      b.blog_photo AS photo,
      b.blog_content AS content,
      b.created_at,
      COALESCE(bl.like_count, 0) AS like_count,
      COALESCE(bc.comment_count, 0) AS comment_count
    FROM blog b
    JOIN users u ON b.user_id = u.user_id
    LEFT JOIN (
      SELECT blog_id, COUNT(*) AS like_count
      FROM blog_likes
      GROUP BY blog_id
    ) bl ON b.blog_id = bl.blog_id
    LEFT JOIN (
      SELECT blog_id, COUNT(*) AS comment_count
      FROM blog_comments
      GROUP BY blog_id
    ) bc ON b.blog_id = bc.blog_id

    UNION ALL

    SELECT
      'post' AS type,
      p.post_id AS id,
      p.user_id,
      u.user_name AS author,
      NULL AS title,
      NULL AS slug,
      p.post_description AS description,
      pi.image_url AS photo,
      NULL AS content,
      p.created_at,
      COALESCE(pl.like_count, 0) AS like_count,
      COALESCE(pc.comment_count, 0) AS comment_count
    FROM post p
    JOIN users u ON p.user_id = u.user_id
    LEFT JOIN LATERAL (
      SELECT image_url
      FROM post_images
      WHERE post_id = p.post_id
      ORDER BY created_at ASC
      LIMIT 1
    ) pi ON true
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS like_count
      FROM post_likes
      GROUP BY post_id
    ) pl ON p.post_id = pl.post_id
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS comment_count
      FROM post_comments
      GROUP BY post_id
    ) pc ON p.post_id = pc.post_id

    ORDER BY created_at DESC;
  `;

  const result = await pool.query(SQL);

  const blogs = result.rows.filter(row => row.type === 'blog');
  const posts = result.rows.filter(row => row.type === 'post');

  return { blogs, posts };
};