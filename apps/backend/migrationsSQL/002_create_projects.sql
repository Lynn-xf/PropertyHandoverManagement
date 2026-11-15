CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    description TEXT,
    location VARCHAR,
    created_by UUID NOT NULL REFERENCES users(id),
    UNIQUE (project_id, unit_number)
    );