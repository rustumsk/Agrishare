import { Request,Response } from "express";
import { Blog } from '../../config/types/types';
import { blogCreate } from "../../model/blog/create.blog";
import { HttpStatus } from "../../config/types/enum";
export const createBlogController = async(req:Request, res:Response): Promise<void> => {
    // const {blog_content} = req.body;
    try{
        // const blog:Blog = {
        //     user_id: blog_content.user_id,
        //     blog_title: blog_content.blog_title,
        //     blog_description: blog_content.blog_description,
        //     blog_photo: blog_content.blog_photo,
        //     blog_content: blog_content,
        // }
        console.log(req.body.content[0].content);
        // await blogCreate(blog);
        res.status(200).json({message: "Blog created successfully!"});
    }catch(e){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Error creating blog", error: e});
        console.log(e);
    }
}