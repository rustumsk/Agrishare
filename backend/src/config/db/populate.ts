import { Client } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

const SQL: string = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_name VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_email VARCHAR(50) UNIQUE NOT NULL,
        google_id VARCHAR(50) UNIQUE,
        bio VARCHAR(200),
        image_url VARCHAR(255),
        contact_no VARCHAR(50),
        role VARCHAR(10) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER'))
    );

    CREATE TABLE IF NOT EXISTS blog(
        post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        blog_content JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS post (
        post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        post_title VARCHAR(50) NOT NULL,
        post_description VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post_images (
        p_images_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INT NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
        image_url VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS post_videos (
        p_videos_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INT NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
        video_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export const popul = async():Promise<void> =>{

    const isTest:boolean = process.env.NODE_ENV == 'test';

    const client = new Client({
        connectionString: isTest? process.env.TESTCONNECT : process.env.DEVCONNECT
    });
    try{
        await client.connect();
        console.log("Connected To DB")
        await client.query(SQL);
    }catch(e){
        console.log(e);
    }finally{
        await client.end();
        console.log("Done!");
    }
}
