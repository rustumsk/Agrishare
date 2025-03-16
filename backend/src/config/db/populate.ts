import { Client } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

const SQL: string = `
    CREATE TABLE IF NOT EXISTS Users(
        user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_name VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_email VARCHAR(50) UNIQUE NOT NULL,
        bio VARCHAR(200),
        image_url VARCHAR(255),
        contact_no VARCHAR(50),
        role VARCHAR(10) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER'))
    );
`;

export const popul = async():Promise<void> =>{
    const client = new Client({
        connectionString: process.env.DEVCONNECT
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
