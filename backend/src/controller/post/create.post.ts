import { Request,Response } from "express";
import { Post, PostMedia } from "../../config/types/types";
import { createPostModel } from "../../model/post/create.post";
import { createMediaModel } from "../../model/helper/create.media";
import { createTagsModel } from "../../model/helper/create.tags";
import jwt from "jsonwebtoken";
import { HttpStatus } from '../../config/types/enum';

export const createPostController = async(req:Request, res:Response): Promise<void> => {
    const tagArr = req.body.tags; 
    const desc = req.body.description;
    const urls = req.body.media;
    const user_token = req.body.token;
    console.log("Hi");
    console.log(user_token);
    console.log(req.body);
    const decoded = jwt.decode(user_token);

    console.log('desc', desc);
    console.log(tagArr);
    console.log(urls);

    try{
        const post:Post = {
            user_id: decoded.user_id,
            post_description: desc,
        };
        const post_id = await createPostModel(post, decoded.user_id);
        console.log("Post created!!");

        const insertMedia = await Promise.all(
            urls.map(async (url: PostMedia) => {
              await createMediaModel(url.url, url.resource_type, post_id);
            })
        );
        if (insertMedia) {
            console.log("Media inserted!!");
        };

        const insertTags = await Promise.all(
            tagArr.map(async (tag:string) => {
              await createTagsModel(tag, post_id);
            })
        );
        if (insertTags) {
            console.log("Tags inserted!!");
        };

        res.status(HttpStatus.OK).send("Post Created!!");
        return
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
        return;
    };
    
}