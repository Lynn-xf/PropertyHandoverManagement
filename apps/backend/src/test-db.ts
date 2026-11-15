import { pool } from "./db";

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('Successfully connected to PostgreSQL database', 'database time:', result.rows[0].now);
    } catch (err) {
        console.error('Database connection failed:', err);
    } finally {
        await pool.end();
    }
}

testConnection();