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

export const getUserForProfile = async (user_id: any): Promise<Object | null> => {
  try {
    const result = await pool.query(
      `
      WITH user_info AS (
        SELECT 
          u.user_id, 
          u.user_name, 
          u.image_url
        FROM users u
        WHERE u.user_id = $1
      ),
      blog_data AS (
        SELECT 
          COUNT(*) AS blog_count
        FROM blog
        WHERE user_id = $1
      ),
      post_data AS (
        SELECT 
          COUNT(*) AS post_count
        FROM post
        WHERE user_id = $1
      ),
      user_blogs AS (
        SELECT 
          blog_id, blog_title, blog_slug, blog_description, blog_photo, blog_content, created_at
        FROM blog
        WHERE user_id = $1
      ),
      user_posts AS (
        SELECT 
          p.post_id, 
          p.post_description, 
          p.created_at,
          COALESCE(
            json_agg(
              json_build_object('p_images_id', pi.p_images_id, 'image_url', pi.image_url)
            ) FILTER (WHERE pi.p_images_id IS NOT NULL),
            '[]'::json
          ) AS images
        FROM post p
        LEFT JOIN post_images pi ON pi.post_id = p.post_id
        WHERE p.user_id = $1
        GROUP BY p.post_id
      ),
      follower_count AS (
        SELECT COUNT(*) AS count
        FROM follows
        WHERE followed_id = $1
      )
      SELECT 
        (SELECT row_to_json(user_info) FROM user_info) AS user,
        (SELECT blog_count FROM blog_data) AS blog_count,
        (SELECT post_count FROM post_data) AS post_count,
        (SELECT json_agg(user_blogs) FROM user_blogs) AS blogs,
        (SELECT json_agg(user_posts) FROM user_posts) AS posts,
        (SELECT count FROM follower_count) AS follower_count
      `,
      [user_id]
    );

    return result.rows[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
};