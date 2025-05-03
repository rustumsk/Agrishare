import { Blog } from "../../config/types/types";
import { pool } from "../../config/db/pool";

export const blogCreate = async(blog:Blog): Promise<boolean> =>{
    try{
        await pool.query(`INSERT INTO Blog(user_id, blog_title, blog_description, blog_photo, blog_content) VALUES ($1,$2,$3,$4,$5)`, [blog.user_id, blog.blog_title, blog.blog_description, blog.blog_photo, blog.blog_content]);
        console.log("Blog created!");
        return true;
    }catch(e){
        console.log(e);
        throw(e);
    }
}