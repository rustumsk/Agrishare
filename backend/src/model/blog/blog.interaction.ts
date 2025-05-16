import { pool } from "../../config/db/pool"

export const likeBlog = async (blog_id: any, user_id: any) => {
  try {
    await pool.query(
      `INSERT INTO blog_likes(user_id, blog_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [blog_id, user_id]
    );
    console.log("Blog liked!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const unlikeBlog = async (blog_id: any, user_id: any) => {
  try {
    await pool.query(
      `DELETE FROM blog_likes WHERE blog_id = $1 AND user_id = $2`,
      [blog_id, user_id]
    );
    console.log("Blog unliked!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const commentBlog = async(blog_id:string | number, user_id:string | number, comment:string) =>{
  try{
    await pool.query(
      `INSERT INTO blog_comments(user_id, blog_id, content) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,[user_id,blog_id,comment]
    );
    console.log("Blog commented!");
  }catch(e){
    console.log(e);
    throw e;
  }
}
