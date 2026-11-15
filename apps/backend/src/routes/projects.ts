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

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

         // Validate UUID format
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(id)) {
            res.status(400).json({
                message: 'Invalid project ID format',
            });
            return;
        }

        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({
                message: 'Project not found'
            });
            return;
        }

        res.status(200).json({
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Error fetching project:', err);

        res.status(500).json({
            message: 'Failed to retrieve project'
        });
    }
});

interface CreateProjectBody {
    name: string;
    description?: string;
    location?: string;
    created_by: string;
};

// POST /api/projects
router.post('/', async (req, res) => {
    try {
        const { name, description, location, created_by } = req.body as CreateProjectBody;

        // Validate required fields
        if (!name?.trim() || !created_by) {
            res.status(400).json({
                message: 'Project name and created_by are required'
            });
            return;
        }

        // Insert the new project into the PostgreSQL database
        const result = await pool.query(
            'INSERT INTO projects (name, description, location, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                name.trim(),
                description ?? null,
                location ?? null,
                created_by,
            ]
        );

        // Return the newly created project
        res.status(201).json({
            message: 'Project created successfully',
            data: result.rows[0]
        });
    } catch (err) {
        console.error('Error creating project:', err);

        res.status(500).json({
            message: 'Failed to create project'
        });
    }
});

export default router;