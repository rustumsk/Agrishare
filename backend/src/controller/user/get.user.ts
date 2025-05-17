import { getUsers } from "../../model/user/read.user";
import { Request,Response } from "express";
import { getFollowerSuggestion, getUserById, getMutualFollowers, getUserForProfile } from "../../model/user/read.user";
import { followUser } from "../../model/user/follow.user";
import { HttpStatus } from "../../config/types/enum";
import { messageUser, getMessages } from '../../model/user/user.message';
import { updateUserProfile } from "../../model/user/update.user";

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

export const messageUserController = async(req:Request, res:Response) =>{
    const {sender_id, receiver_id, content} = req.body;
    try{
        await messageUser(sender_id, receiver_id, content);
        res.status(HttpStatus.OK).send("Message sent!");
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}

export const getMessagesController = async (req: Request, res: Response) => {
  const { sender_id, receiver_id } = req.query;
  try {
    const data = await getMessages(sender_id, receiver_id);
    res.status(HttpStatus.OK).send(data); 
  } catch (e) {
    console.error(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const getUserForProfleController = async(req:Request, res:Response) =>{
    const {user_id} = req.query;
    try{
        console.log(user_id);
        const data = await getUserForProfile(user_id);
        res.status(HttpStatus.OK).send(data);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { user_id, user_name, image_url } = req.body;

    if (!user_id || !user_name || !image_url) {
      return res.status(400).json({ message: "user_id, user_name, and image_url are required" });
    }

    const updatedUser = await updateUserProfile(user_id, user_name, image_url);

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};