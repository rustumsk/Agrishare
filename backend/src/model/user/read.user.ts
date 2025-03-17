import { pool} from "../../config/db/pool";

export const readUserbyEmail = async(user_email:string):Promise<boolean | null > =>{

    try{
        let result;
        
        result = await pool.query("SELECT * FROM Users where user_email = $1", [user_email]);
        
        return result.rows.length > 0;
    }catch(e){
        console.log(e);
        throw(e);
    }
}

export const readUserbyUsername = async(user_name:string):Promise<boolean | null > =>{
    let result;
    try{
        result = await pool.query("SELECT * FROM Users where user_name = $1", [user_name]);
        
        return result.rows.length > 0;
    }catch(e){
        console.log(e);
        throw(e);
    }
    
}