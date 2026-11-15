import {Pool} from 'pg';
import dotenv from 'dotenv';

// load environement variables from .env file
dotenv.config();

// create a new pool instance with the database connection configuration
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// check for connection errors
pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL client error', err);
});