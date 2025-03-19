import { Request,Response } from "express";
import { GoogleUser } from "../../config/types/types";
import { HttpStatus } from "../../config/types/enum";

export const googleAuthMiddleware = (req:Request, res:Response) =>{
    const user = req.user as GoogleUser;

    // check if the user already exists
    // if it exists redirect to the appropriate frontend(TO - DO) and send the jwt.
    if (user.type === "Existing"){
        console.log("user exists!");
        res.status(HttpStatus.OK).send({message:"jwt token", token:user.token});
        return;
    }

    // if not then create the user with additional information given from the frontend(TO - DO)
    // then redirect to the appropriate route to login or logged in directly.
    console.log("New user!");
    res.status(HttpStatus.OK).send({message: "Continue in additional information form in the frontend to complete registration"});
    return;
}