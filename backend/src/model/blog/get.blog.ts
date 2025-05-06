import { pool } from "../../config/db/pool";

export const getBlog = async (blogId: number): Promise<any> => {
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
              u.user_name AS author_name
            FROM blog b
            JOIN users u ON b.user_id = u.user_id
            WHERE b.blog_id = $1
        `, [blogId]);
        return data.rows[0];
    } catch (e) {
        console.error(e);
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
          u.user_name AS author_name
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