import { pool } from "../../config/db/pool";
import { User } from "../../config/types/types";

export const createLocalModel = async(user:User):Promise<boolean> =>{
    try{
        await pool.query(`INSERT INTO Users(user_name,password,user_email,bio,image_url,contact_no,role) VALUES($1,$2,$3,$4,$5,$6,$7)`,[user.user_name,
            user.password,user.user_email,user.bio,user.image_url,user.contact_no,user.role
        ]);
        console.log("Local User Created!");
        return true;
    }catch(e){
        console.log(e);
        throw(e);
    }
}