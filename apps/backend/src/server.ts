import express from 'express';
import { pool } from './db';
import projectsRouter from './routes/projects';

const app = express();
const PORT = process.env.PORT;

// Middleware:parse incoming JSON requests
app.use(express.json());

// Register the projects router
app.use('/api/projects', projectsRouter);

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.status(200).json({ 
            status: 'ok', 
            message: 'Property Handover Management API is running',
            database: 'Connected to PostgreSQL database',
            databaseTime: result.rows[0].now 
        });
    } catch (err) {
        console.error('Health check failed:', err);

        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Property Handover Management API running on http://localhost:${PORT}`);
});