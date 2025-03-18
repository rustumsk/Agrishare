import { pool} from "../../config/db/pool";
/*
Most functions can be a generic function, but I decided not to do it so that it can be easily understood 
and improve security by preventeng sql injection.
*/

//Check if a user exists by its email. Returns boolean;
export const checkUserByEmail = async(user_email:string):Promise<boolean | null > =>{

    try{
        let result;
        result = await pool.query("SELECT * FROM Users where user_email = $1", [user_email]);
        return result.rows.length > 0;
    }catch(e){
        console.log(e);
        throw(e);
    }
}
//check if a user exists by its user_name. Returns boolean;
export const checkUserByName = async(user_name:string):Promise<boolean | null > =>{
    let result;
    try{
        result = await pool.query("SELECT * FROM Users where user_name = $1", [user_name]);
        return result.rows.length > 0;
    }catch(e){
        console.log(e);
        throw(e);
    }
    
}
//get a specific user by using its email. Returns an object from the db.
export const getUserByEmail = async(user_email:string):Promise<any|null> =>{
    try{
        const result = await pool.query("SELECT * FROM Users where user_email = $1", [user_email]);
        return result.rows[0];
    }catch(e){
        console.log(e);
        throw(e);
    }
}
//get a specific user by using its name. Returns an object from the db.
export const getUserByName = async(user_name:string):Promise<Object> =>{
    try{
        const result = await pool.query("SELECT * FROM Users where user_name = $1", [user_name]);
        return result.rows[0];
    }catch(e){
        console.log(e);
        throw(e);
    }
}