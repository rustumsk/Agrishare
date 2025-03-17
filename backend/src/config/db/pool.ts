import { Pool } from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

const isTest:boolean = process.env.NODE_ENV == 'test';

export const pool: Pool = new Pool({
    connectionString: isTest? process.env.TESTCONNECT : process.env.DEVCONNECT
})
