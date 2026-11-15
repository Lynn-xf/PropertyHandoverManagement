CREATE TABLE defect_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    defect_id UUID REFERENCES defects(id) NOT NULL,
    changed_by UUID REFERENCES users(id) NOT NULL,
    old_status VARCHAR,
    new_status VARCHAR NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note TEXT
    );
