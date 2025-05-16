import { likeBlog, unlikeBlog, commentBlog } from '../../model/blog/blog.interaction';
import { Request, Response } from "express";
import { HttpStatus } from "../../config/types/enum";

export const likeBlogController = async(req:Request, res:Response) => {
    const {user_id, blog_id} = req.body;
    try{
        await likeBlog(blog_id, user_id);
        res.status(HttpStatus.OK).send("Liked!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}

export const unlikeBlogController = async(req:Request, res:Response) => {
    const {user_id, blog_id} = req.body;
    try{
        await unlikeBlog(blog_id, user_id);
        res.status(HttpStatus.OK).send("Liked!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}

export const commentBlogController = async(req:Request, res:Response) => {
    const {user_id, blog_id, comment} = req.body;
    try{
        await commentBlog(blog_id, user_id, comment);
        res.status(HttpStatus.OK).send("Commented!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}