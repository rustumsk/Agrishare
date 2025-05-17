import { likeBlog, unlikeBlog, commentBlog } from '../../model/blog/blog.interaction';
import { Request, Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { io } from '../../../server';
import { getBlogLikes, getBlogComments } from '../../model/blog/get.blog';
import { getIfBlogLiked } from '../../model/blog/get.blog';
export const likeBlogController = async(req:Request, res:Response) => {
    const {user_id, blog_id} = req.body;
    try{
        await likeBlog(blog_id, user_id);
        console.log(blog_id);
        const blog_count = await getBlogLikes(blog_id);
        const check = await getIfBlogLiked(user_id, blog_id);
        console.log(blog_count);
        io.emit('blogLike', {
            check,
            blog_count,
            user_id,
            blog_id
        });

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
        const blog_count = await getBlogLikes(blog_id);
        console.log(blog_count);
        const check = await getIfBlogLiked(user_id, blog_id);

        io.emit('blogUnlike', {
            check,
            blog_count,
            user_id,
            blog_id
        });
        res.status(HttpStatus.OK).send("unLiked!!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}

export const commentBlogController = async(req:Request, res:Response) => {
    const {user_id, blog_id, comment} = req.body;
    try{
        await commentBlog(blog_id, user_id, comment);
        const comments = await getBlogComments(blog_id);
        io.emit('blogComment', {
            user_id,
            blog_id,
            comments
        });
        res.status(HttpStatus.OK).send("Commented!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}