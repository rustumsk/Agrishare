import { getUsers } from "../../model/user/read.user";
import { Request,Response } from "express";
import { getFollowerSuggestion, getUserById, getMutualFollowers } from "../../model/user/read.user";
import { followUser } from "../../model/user/follow.user";
import { HttpStatus } from "../../config/types/enum";

export const getFollowerSuggestionController = async(req: Request, res:Response) =>{
    const {user_id} = req.query;
    try{
        const data = await getFollowerSuggestion(user_id);
        res.status(HttpStatus.OK).send(data);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}

export const getUserByIdController = async(req:Request, res:Response) =>{
    const {user_id} = req.query;
    try{
        console.log(user_id);
        const data = await getUserById(user_id);
        res.status(HttpStatus.OK).send(data);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}

export const followUserController = async(req:Request, res:Response) =>{
    const {follower_id, followed_id} = req.body;
    console.log(follower_id, followed_id);
    try{
        await followUser(follower_id, followed_id);
        res.status(HttpStatus.OK).send("Ok");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");

    }
}

export const getMutualFollowersController = async(req:Request, res:Response) =>{
    const {user_id} = req.query;
    try{
        const data = await getMutualFollowers(user_id);
        console.log(data);
        res.send(data);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}