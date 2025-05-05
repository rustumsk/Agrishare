import { Request,Response } from "express";
import { Blog } from '../../config/types/types';
import { blogCreate } from "../../model/blog/create.blog";
import { HttpStatus } from "../../config/types/enum";
import jwt from "jsonwebtoken";
export const createBlogController = async(req:Request, res:Response): Promise<void> => {
    const user_token = req.body.token;
    const id = jwt.decode(user_token);
    try{ 
        
        const blog = {
            user_id: id.user_id,
            blog_title: req.body.title,
            blog_slug: req.body.blog_slug,
            blog_description: req.body.description,
            blog_photo: req.body.imageUrl,
            blog_content: req.body.content,
        }

        console.log( typeof req.body.content);
        console.log(req.body.content);
        await blogCreate(blog);
        res.status(200).json({message: "Blog created successfully!"});
    }catch(e){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Error creating blog", error: e});
        console.log(e);
    }
}