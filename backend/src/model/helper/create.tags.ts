import { pool } from "../../config/db/pool";

export const createTagsModel = async (tag_name: string, post_id: number): Promise<boolean> => {
    try {
        await pool.query(`INSERT INTO tags(post_id, tag_name) VALUES ($1, $2)`, [post_id, tag_name]);
        console.log("Tag created!");
        return true;
    } catch (e) {
        console.log(e);
        throw (e);
    }
}