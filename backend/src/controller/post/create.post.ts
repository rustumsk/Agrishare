import { Request,Response } from "express";
import { Post } from "../../config/types/types";

export const createPostController = async(req:Request, res:Response): Promise<void> => {
    const {data} = req.body;
    try{
        console.log("Hi");
        console.log(req.body);
    }catch(e){
        console.log(e);
    }
}