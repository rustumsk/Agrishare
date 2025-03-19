import { Request,Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { User } from "../../config/types/types";
import { hashPassword } from "../../helper/password.helper";
import { createLocalModel } from "../../model/user/create.user";
import { checkUserByEmail } from "../../model/user/read.user";

//For signup/register
export const signUpController = async (req:Request,res:Response) =>{
    const body = req.body;
    const password = await hashPassword(req.body.password);

    const user:User = {
        user_name: body.user_name,
        password: password,
        user_email: body.user_email,
        bio: body.bio,
        image_url: body.image_url,
        contact_no: body.contact_no,
        role: body.role
    }
    const check = await checkUserByEmail(user.user_email);

    if (check){
        res.status(HttpStatus.CONFLICT).send({message:"User already created!"});
        return;
    }

    try{
        await createLocalModel(user);
        res.status(HttpStatus.CREATED).send("User Successfully Created!");
    }catch(e){
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}