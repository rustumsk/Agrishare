import { Request, Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { likePost, unlikePost, commentPost, getNotifs, sendNotif } from '../../model/post/post.interaction';
import { getPostComments, getPostLikes } from "../../model/post/get.post";
import { io } from "../../../server";

export const likePostController = async(req:Request, res:Response) =>{
    const {user_id, post_id} = req.body;
    console.log("Hello!");
    console.log(user_id, post_id);
    try{
        await likePost(post_id, user_id);

        const like_count = await getPostLikes(post_id);

        io.emit("like", {
            post_id,
            like_count,
            user_id,
        }); 
            
        res.status(HttpStatus.OK).send("Liked!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
};

export const unlikePostController = async(req:Request, res:Response) =>{
    const {user_id, post_id} = req.body;
    try{
        await unlikePost(post_id, user_id);
        const like_count = await getPostLikes(post_id);

        io.emit("unlike", {
            post_id,
            like_count,
            user_id,
        }); 
        res.status(HttpStatus.OK).send("unLiked!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
};

export const commentPostController = async(req:Request, res:Response) =>{
    const {user_id, post_id, comment} = req.body;
    try{
        await commentPost(post_id, user_id, comment);

        const comments = await getPostComments(post_id);
        io.emit("comment", {
            post_id,
            comments
        });

        res.status(HttpStatus.OK).send("Commented!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}

export const getCommentPostController = async(req:Request, res:Response) =>{
    const {post_id} = req.query as any;
    console.log("post");
    console.log(post_id);
    try{
        const comments = await getPostComments(post_id);
        console.log(comments);
        res.status(HttpStatus.OK).send(comments);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}

export const getNotifsController = async(req:Request, res:Response) =>{
    const {user_id} = req.query as any;
    try{
        const notifs = await getNotifs(user_id);
        console.log("Hi");
        console.log(user_id);
        console.log(notifs);
        res.status(HttpStatus.OK).send(notifs);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}

export const sendNotifController = async(req:Request, res:Response) =>{
    const {receiver_id, type, content} = req.body;
    try{
        await sendNotif(receiver_id, type, content);
        res.status(HttpStatus.OK).send("Notification sent!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
}