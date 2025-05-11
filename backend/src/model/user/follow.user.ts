import { pool } from "../../config/db/pool";

export const followUser = async(follower_id:number, followed_id: number) =>{
    try{
        await pool.query("INSERT INTO follows(follower_id, followed_id) VALUES ($1,$2)", [follower_id, followed_id]);
        console.log(`${follower_id} followed ${followed_id}`);
    }catch(e){
        console.log(e);
        throw(e);
    }
}