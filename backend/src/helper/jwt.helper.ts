import  jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

//generate jwt token and the payload is the email.
export const generateTokenbyEmail = (email:string):string =>{
    return jwt.sign(
        {
            email
        },
        process.env.JWT_SECRET_KEY as string,
        {expiresIn: '7d'}
    )
};

export const generateTokenbyId = (user_id:number):string =>{
    return jwt.sign(
        {
            user_id
        },
        process.env.JWT_SECRET_KEY as string,
        {expiresIn: '7d'}
    )
};