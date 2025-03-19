import { Blog } from "../../config/types/types";
import { pool } from "../../config/db/pool";

export const blogCreate = async(blog:Blog): Promise<boolean> =>{
    try{
        await pool.query(`INSERT INTO Blog(user_id, blog_content) VALUES ($1,$2)`, [blog.user_id, blog.blog_content]);
        console.log("Blog created!");
        return true;
    }catch(e){
        console.log(e);
        throw(e);
    }
}