import { Request, Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { likePost,unlikePost } from "../../model/post/like.post";

export const likePostController = async(req:Request, res:Response) =>{
    const {user_id, post_id} = req.body;
    try{
        await likePost(post_id, user_id);
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
        res.status(HttpStatus.OK).send("unLiked!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request!");
    }
};