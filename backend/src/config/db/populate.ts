import { Client } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_name VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_email VARCHAR(50) UNIQUE NOT NULL,
        google_id VARCHAR(50) UNIQUE,
        bio VARCHAR(200),
        image_url VARCHAR(255) DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' ,
        contact_no VARCHAR(50),
        role VARCHAR(10) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER'))
    );

    CREATE TABLE IF NOT EXISTS blog (
        blog_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        blog_title VARCHAR(255) NOT NULL,
        blog_slug VARCHAR(255) NOT NULL UNIQUE,
        blog_description VARCHAR(255),
        blog_photo VARCHAR(255) NOT NULL,
        blog_content JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_draft (
        blog_draft_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        blog_id INT NOT NULL REFERENCES blog(blog_id),
        blog_content JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_published BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS blog_likes (
        like_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        blog_id INT NOT NULL REFERENCES blog(blog_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_blog_like UNIQUE (user_id, blog_id)
    );

    CREATE TABLE IF NOT EXISTS blog_comments (
        comment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        blog_id INT NOT NULL REFERENCES blog(blog_id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post (
        post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        post_description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post_tags (
        tag_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INT NOT NULL REFERENCES post(post_id),
        tag_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post_images (
        p_images_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INT NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post_videos (
        p_videos_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INT NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
        video_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post_likes (
        like_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        post_id INT NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_post_like UNIQUE (user_id, post_id)
    );

    CREATE TABLE IF NOT EXISTS post_comments (
        comment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        post_id INT NOT NULL REFERENCES post(post_id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
        message_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        sender_id INT NOT NULL REFERENCES users(user_id),
        receiver_id INT NOT NULL REFERENCES users(user_id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_read BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS groups (
        group_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        group_name VARCHAR(100) NOT NULL,
        created_by INT NOT NULL REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS group_members (
        group_id INT REFERENCES groups(group_id) ON DELETE CASCADE,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (group_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS group_messages (
        group_message_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        group_id INT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
        sender_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS follows (
        follow_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        follower_id INT NOT NULL REFERENCES users(user_id),
        followed_id INT NOT NULL REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_follow UNIQUE (follower_id, followed_id)
    );

    CREATE TABLE IF NOT EXISTS notifications (
        notification_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL REFERENCES users(user_id),
        type VARCHAR(50) NOT NULL,
        message TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- INDEXES
    CREATE INDEX IF NOT EXISTS idx_post_user ON post(user_id);
    CREATE INDEX IF NOT EXISTS idx_blog_user ON blog(user_id);
    CREATE INDEX IF NOT EXISTS idx_messages_pair ON messages(sender_id, receiver_id);
    CREATE INDEX IF NOT EXISTS idx_following_user ON follows(follower_id);
    CREATE INDEX IF NOT EXISTS idx_followed_user ON follows(followed_id);
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
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
