import { pool } from "../../config/db/pool";
import { User } from "../../config/types/types";

export const readUserbyEmail = async(user_email:string):Promise<boolean> =>{
    try{
        const result = await pool.query("SELECT * FROM Users where user_email = $1", [user_email]);
        return result.rows.length > 0;
    }catch(e){
        console.log(e);
        throw e;
    }
}