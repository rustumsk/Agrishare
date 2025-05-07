import {pool} from "../../config/db/pool";

export const createMediaModel = async(url: string,file_type: string, post_id: number): Promise<boolean> => {
    if (file_type == "video") {
        try{
            await pool.query(`INSERT INTO post_videos(post_id, video_url) VALUES ($1, $2)`, [post_id, url]);
            console.log("Video created!");
            return true;
        }catch(e){
            console.log(e);
            throw(e);
        }
    }  else if (file_type == "image") {      
        try{
            await pool.query(`INSERT INTO post_images(post_id, image_url) VALUES ($1, $2)`, [post_id, url]);
            console.log("Video created!");
            return true;
        }
        catch(e){
            console.log(e);
            throw(e);
        }
    }
    else {
        console.log("Invalid file type");
        return false;
    }
}
