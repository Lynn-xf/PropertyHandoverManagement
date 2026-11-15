/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`CREATE TABLE defects (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     property_id UUID REFERENCES properties(id) NOT NULL,
     location_note TEXT,
     title VARCHAR NOT NULL,
     description TEXT,
     priority VARCHAR NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
     status VARCHAR NOT NULL CHECK (status IN ('open', 'assigned', 'in_progress', 'fixed', 'verified')),
     assignee_id UUID REFERENCES assignees(id),
     planned_start_date DATE,
     planned_finish_date DATE NOT NULL, 
     actual_start_date DATE,
     actual_finish_date DATE,
     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

     CONSTRAINT valid_planned_dates CHECK (
        planned_start_date IS NULL
        OR planned_finish_date >= planned_start_date
    ),

    CONSTRAINT valid_actual_dates CHECK (
        actual_start_date IS NULL
        OR actual_finish_date IS NULL
        OR actual_finish_date >= actual_start_date
    )
     );`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`DROP TABLE IF EXISTS defects;`); 
};
