import { pool } from "../../config/db/pool";

export const getBlog = async (blogId: number, currentUserId: any): Promise<any> => {
  try {
    // Get blog info with like count and author_id
    const blogResult = await pool.query(`
      SELECT 
        b.blog_id,
        b.blog_title,
        b.blog_slug,
        b.blog_description,
        b.blog_photo,
        b.blog_content,
        b.created_at,
        u.user_id AS author_id,
        u.user_name AS author_name,
        u.image_url AS author_image,
        COUNT(bl.like_id) AS like_count
      FROM blog b
      JOIN users u ON b.user_id = u.user_id
      LEFT JOIN blog_likes bl ON bl.blog_id = b.blog_id
      WHERE b.blog_id = $1
      GROUP BY b.blog_id, u.user_id, u.user_name, u.image_url
    `, [blogId]);

    const blog = blogResult.rows[0];

    const likeCheck = await pool.query(`
      SELECT 1 FROM blog_likes 
      WHERE blog_id = $1 AND user_id = $2
    `, [blogId, currentUserId]);

    blog.isLiked = likeCheck.rowCount as any > 0;

    const commentsResult = await pool.query(`
      SELECT 
        bc.comment_id,
        bc.content,
        bc.created_at,
        u.user_id,
        u.user_name,
        u.image_url
      FROM blog_comments bc
      JOIN users u ON u.user_id = bc.user_id
      WHERE bc.blog_id = $1
      ORDER BY bc.created_at ASC
    `, [blogId]);

    blog.comments = commentsResult.rows;

    return blog;

  } catch (e) {
    console.error("Error fetching blog:", e);
    throw e;
  }
};

export const getAllBlogs = async (): Promise<any> => { 
  try {
    const data = await pool.query(`
      SELECT 
        b.blog_id,
        b.blog_title,
        b.blog_slug,
        b.blog_description,
        b.blog_photo,
        b.blog_content,
        b.created_at,
        u.user_name AS author_name,
        (
          SELECT COUNT(*) 
          FROM blog_likes 
          WHERE blog_id = b.blog_id
        ) AS likes_count,
        (
          SELECT COUNT(*) 
          FROM blog_comments 
          WHERE blog_id = b.blog_id
        ) AS comments_count
      FROM blog b
      JOIN users u ON b.user_id = u.user_id
      ORDER BY b.created_at DESC
      LIMIT 10 OFFSET 0
    `);
    return data.rows;
  } catch (e) { 
    console.log(e);
    throw e;  
  }
};

  export const getBlogComments = async (blog_id: number) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.comment_id,
        c.content,
        c.created_at,
        u.user_id,
        u.user_name,
        u.image_url
      FROM blog_comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.blog_id = $1
      ORDER BY c.created_at ASC
    `, [blog_id]);

    return result.rows;
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    throw error;
  }
};

export const getBlogLikes = async (postId: number) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        COUNT(*) AS blog_count
      FROM blog_likes
      WHERE blog_id = $1
      `,
      [postId]
    );
    return result.rows[0].blog_count;
  } catch (error) {
    console.error("Error getting blog likes:", error);
    throw error;
  }
};

export const getIfBlogLiked = async (user_id: number, blog_id: number): Promise<boolean> => {
  const result = await pool.query(
    `SELECT 1 FROM blog_likes WHERE user_id = $1 AND blog_id = $2`,
    [user_id, blog_id]
  );
  return result.rowCount as any > 0;
};