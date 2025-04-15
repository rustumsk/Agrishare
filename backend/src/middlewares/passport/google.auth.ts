import { Request,Response } from "express";
import { GoogleUser } from "../../config/types/types";
import { HttpStatus } from "../../config/types/enum";
import { generateTokenbyEmail } from '../../helper/jwt.helper';
import * as dotenv from 'dotenv';
dotenv.config();
export const googleAuthMiddleware = (req:Request, res:Response) =>{
    const user = req.user as GoogleUser;

    // check if the user already exists
    // if it exists redirect to the appropriate frontend(TO - DO) and send the jwt.
    if (user.type === "Existing"){
        console.log("user exists!");
        console.log();
        res.cookie('token', user.token, { httpOnly: false, secure: true, sameSite:'lax'});
        res.redirect(`${process.env.F_URL}/home`);
        return;
    }

    // if not then create the user with additional information given from the frontend(TO - DO)
    // then redirect to the appropriate route to login or logged in directly.
    console.log("New user!");
    const token = generateTokenbyEmail(user.additionalInfo?.email as string);
    res.cookie('email', token, { httpOnly: false, secure: true, sameSite:'lax'});
    res.redirect(`${process.env.F_URL}/signup/continue`);
    return;
}