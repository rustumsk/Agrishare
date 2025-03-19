import { Request,Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import { HttpStatus } from "../../config/types/enum";
import jwt from "jsonwebtoken";
dotenv.config();

export const authorizeUser = (req: Request, res: Response, done: NextFunction) =>{
    const bearerToken = req.headers['authorization'];

    if (!bearerToken){
        res.status(HttpStatus.FORBIDDEN).json({message:"Unauthorize"});
        return;
    }
    const token = bearerToken?.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, user: any) =>{
        if (err){
            console.log(err);
            return res.status(HttpStatus.FORBIDDEN).json({message:'Forbidden!'});
        }
        console.log("verified");
        req.user = user;
        done();
    });
}