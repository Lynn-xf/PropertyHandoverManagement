CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) NOT NULL,
    client_id UUID REFERENCES clients(id),
    unit_number VARCHAR NOT NULL,
    handover_date DATE,
    UNIQUE (project_id, unit_number)
    );