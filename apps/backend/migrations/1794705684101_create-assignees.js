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
    pgm.sql(`CREATE TABLE assignees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL
        CHECK (type IN ('user', 'work_group', 'contractor')),
    user_id UUID UNIQUE REFERENCES users(id),
    email VARCHAR(255),
    phone VARCHAR(50),
    trade VARCHAR(100),

    CONSTRAINT valid_assignees_user
    CHECK (
        (type = 'user' AND user_id IS NOT NULL)
        OR
        (type IN ('work_group', 'contractor') AND user_id IS NULL)
    )
    );`
);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`DROP TABLE IF EXISTS assignees;`);
};
