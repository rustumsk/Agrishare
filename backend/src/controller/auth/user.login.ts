import { Request,Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { readUserbyEmail } from "../../model/user/read.user";

const localLoginController = async (req:Request, res:Response) => {
    const {email, user_name,  password} = req.body;

    if (!email && !user_name) {
        res.status(400).json({ message: "Email or username is required!" });
        return;
    }

    try{
        
    }catch(e){

    }
}