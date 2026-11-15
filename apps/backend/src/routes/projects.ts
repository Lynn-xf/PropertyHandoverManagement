import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// GET /api/projects
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY name ASC');

        res.status(200).json({
            data: result.rows
        });
    } catch (err) {
        console.error('Error fetching projects:', err);

        res.status(500).json({
            message: 'Failed to retrieve projects'
        });
    }
});

// POSRT /api/projects

export default router;