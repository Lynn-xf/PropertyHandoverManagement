CREATE TABLE defectHistory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    defect_id UUID REFERENCES defects(id) NOT NULL,
    changed_by UUID REFERENCES users(id) NOT NULL,
        old_status VARCHAR(30)
        CHECK (old_status IS NULL OR old_status IN ('open', 'assigned', 'in_progress', 'fixed', 'verified')),
    new_status VARCHAR(30) NOT NULL
        CHECK (new_status IN ('open', 'assigned', 'in_progress', 'fixed', 'verified')),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note TEXT
    );
