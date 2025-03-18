import { Request,Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { getUserByEmail, getUserByName, checkUserByEmail, checkUserByName } from "../../model/user/read.user";
import { verifyPassword } from '../../helper/password.helper';
import { generateTokenbyId } from "../../helper/jwt.helper";

//This function can be shorten, but i wrote it like this so whoever reads this can understand this easily.
export const localLoginController = async (req:Request, res:Response) => {
    //get the email or username, and password from the request body.
    const {user_email, user_name,  password} = req.body;

    // check if email or username is empty. if empty then respond with error.
    if (!user_email && !user_name) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Email or username is required!" });
        return;
    }
    const genericError = { message: "Invalid credentials" };

    try{
        // this conditional statement checks if the user passed an email or username to log in,
        // and get the corresponding object and then assign it to the rUser which will then be -
        // used to verify and log in the user.
        const rUser = user_email ? await getUserByEmail(user_email) : await getUserByName(user_name);
      
        if (!rUser){
            res.status(HttpStatus.NOT_FOUND).send(genericError);
            return;
        }
        //check if the password the user passed is the same as the password hashed in the db
        const checkPassword = await verifyPassword(password, rUser.password);

        //this checks whether the password is correct or not. If not then respond with an error.
        if(!checkPassword){
            res.status(HttpStatus.UNAUTHORIZED).send(genericError);
            return;
        }
        
        //password is correct, now generate a jwt token to the success response.
        const token = generateTokenbyId(rUser.user_id);
        res.status(HttpStatus.OK).send({message: "Login Successfully", token});
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send({message:"Bad Request"});
    }
}