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

export const getUserById = async(user_id:any):Promise<any|null> =>{
    try{
        const result = await pool.query("SELECT * FROM Users where user_id = $1", [user_id]);
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

export const getUsers = async(user_id:string):Promise<Object> =>{
    try{
        const result = await pool.query("SELECT * FROM Users LIMIT BY 10");
        return result.rows[0];
    }catch(e){
        console.log(e);
        throw(e);
    }
}

export const getFollowerSuggestion = async (user_id: any): Promise<Object[]> => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM users 
      WHERE user_id <> $1 
        AND user_id NOT IN (
          SELECT followed_id FROM follows WHERE follower_id = $1
        )
      LIMIT 6
      `,
      [user_id]
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
};


export const getMutualFollowers = async (user_id: any): Promise<Object[]> => {
  try {
    const result = await pool.query(
      `
      SELECT u.*
      FROM follows f1
      JOIN follows f2 ON f1.followed_id = f2.follower_id AND f1.follower_id = f2.followed_id
      JOIN users u ON u.user_id = f1.followed_id
      WHERE f1.follower_id = $1
      `,
      [user_id]
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    throw e;
  }
};