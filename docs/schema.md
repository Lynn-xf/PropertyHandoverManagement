# Database Schema

## 1. Users

- `id` (UUID, PK)
- `name` (VARCHAR, NOT NULL)
- `email` (VARCHAR, UNIQUE, NOT NULL)
- `auth_provider_id` (VARCHAR, UNIQUE, nullable)

## 1.1 clients

- `id` (UUID, PK)
- `name` (VARCHAR, NOT NULL)
- `email` (VARCHAR, UNIQUE, NOT NULL)

## 2. Projects

- `id` (UUID, PK)
- `name` (VARCHAR, NOT NULL)
- `description` (TEXT Nullable)
- `location` (VARCHAR, nullable)
- `created_by` (UUID, FK → `users.id`, NOT NULL)

## 3. Properties

- `id` (UUID, PK)
- `project_id` (UUID, FK → `projects.id`, NOT NULL)
- `unit_number` (VARCHAR, NOT NULL)
- `handover_date` (DATE, nullable)
- `client_id` (UUID, FK → `clients.id`, Nullable)

**Constraints:**
- UNIQUE (`project_id`, `unit_number`)

## 4. Assignees

- `id` (UUID, PK)
- `name` (VARCHAR, NOT NULL)
- `type` (VARCHAR, NOT NULL)
- `user_id` (UUID, FK → `users.id`, UNIQUE, nullable)
- `email` (VARCHAR, nullable)
- `phone` (VARCHAR, nullable)
- `trade` (VARCHAR, nullable)

**Constraints:**
- `type` must be one of: `user`, `work_group`, `contractor`.
- If `type = 'user'`, `user_id` must NOT be NULL.
- If `type = 'work_group'` or `contractor`, `user_id` must be NULL.
- Each user can have at most one corresponding user-type assignee.

## 5. Defects

- `id` (UUID, PK)
- `property_id` (UUID, FK → `properties.id`, NOT NULL)
- `location_note` (TEXT, nullable)
- `title` (VARCHAR, NOT NULL)
- `description` (TEXT, nullable)
- `priority` (VARCHAR, NOT NULL)
- `status` (VARCHAR, NOT NULL)
- `assignee_id` (UUID, FK → `assignees.id`, nullable)
- `planned_start_date` (DATE, nullable)
- `planned_start_date` (DATE, NOT NULL)
- `actual_start_date` (DATE, nullable)
- `actual_finish_date` (DATE, nullable)
- `created_at` (TIMESTAMPTZ, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

**Constraints:**
- `priority` must be one of: `low`, `medium`, `high`, `critical`.
- `status` must be one of: `open`, `assigned`, `in_progress`, `fixed`, `verified`.
- A defect can have zero or one assignee.
- Status transitions and assignment rules must be validated by the application.

## 6. Defect History

- `id` (UUID, PK)
- `defect_id` (UUID, FK → `defects.id`, NOT NULL)
- `changed_by` (UUID, FK → `users.id`, NOT NULL)
- `old_status` (VARCHAR, nullable)
- `new_status` (VARCHAR, NOT NULL)
- `changed_at` (TIMESTAMPTZ, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- `note` (TEXT, nullable)

**Constraints:**
- `old_status` and `new_status` must be valid defect statuses when provided.
- `old_status` can be NULL for the initial status.
- History records should be append-only; existing records should not be overwritten.

## Relationships

- Users → Projects (one-to-many, as project creator)
- Projects → Properties (one-to-many)
- Properties → Defects (one-to-many)
- Assignees → Defects (one-to-many, as individual, work group or contractor assignee)
- Defects → Defect History (one-to-many)
- Users → Defect History (one-to-many, as editor)
- Clients → Properties (one-to-many)

## General Database Rules

- Use foreign keys to maintain referential integrity.
- Use `NOT NULL` for required fields and allow NULL only where specified.
- Use database transactions when updating a defect's status and creating its history record.
- Use PostgreSQL `CHECK` constraints for fixed values such as priority, status and assignee type.
- Use application-level validation for business workflows, including permitted status transitions.