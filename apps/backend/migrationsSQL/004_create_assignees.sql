CREATE TABLE assignees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL
        CHECK (type IN ('user', 'work_group', 'contractor')),
    user_id UUID UNIQUE REFERENCES users(id),
    email VARCHAR(255),
    phone VARCHAR(50),
    trade VARCHAR(100),

    CONSTRAINT valid_assignee_user
    CHECK (
        (type = 'user' AND user_id IS NOT NULL)
        OR
        (type IN ('work_group', 'contractor') AND user_id IS NULL)
    )
    );