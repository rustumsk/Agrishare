import { Pool } from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

export const pool: Pool = new Pool({
    connectionString: process.env.DEVCONNECT
})
