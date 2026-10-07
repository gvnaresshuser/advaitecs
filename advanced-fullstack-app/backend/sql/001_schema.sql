CREATE TABLE users_adviatecs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE roles_adviatecs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_roles_adviatecs (
    user_id UUID NOT NULL,
    role_id INTEGER NOT NULL,

    PRIMARY KEY (user_id, role_id),

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users_adviatecs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles_adviatecs(id)
        ON DELETE CASCADE
);

CREATE TABLE projects_adviatecs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_projects_owner
        FOREIGN KEY (owner_id)
        REFERENCES users_adviatecs(id)
);

CREATE TABLE project_members_adviatecs (
    project_id UUID NOT NULL,
    user_id UUID NOT NULL,

    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (project_id, user_id),

    CONSTRAINT fk_project_members_project
        FOREIGN KEY (project_id)
        REFERENCES projects_adviatecs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_members_user
        FOREIGN KEY (user_id)
        REFERENCES users_adviatecs(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks_adviatecs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL,
    assigned_to UUID,

    title VARCHAR(200) NOT NULL,
    description TEXT,

    status VARCHAR(30) NOT NULL DEFAULT 'TODO',
    priority VARCHAR(30) NOT NULL DEFAULT 'MEDIUM',

    due_date DATE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_tasks_project
        FOREIGN KEY (project_id)
        REFERENCES projects_adviatecs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tasks_assigned_user
        FOREIGN KEY (assigned_to)
        REFERENCES users_adviatecs(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_task_status
        CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),

    CONSTRAINT chk_task_priority
        CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH'))
);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE comments_adviatecs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    task_id UUID NOT NULL,
    user_id UUID NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_comments_task
        FOREIGN KEY (task_id)
        REFERENCES tasks_adviatecs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id)
        REFERENCES users_adviatecs(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_users_adviatecs_email
ON users_adviatecs(email);

CREATE INDEX idx_projects_adviatecs_owner_id
ON projects_adviatecs(owner_id);

CREATE INDEX idx_project_members_adviatecs_user_id
ON project_members_adviatecs(user_id);

CREATE INDEX idx_tasks_adviatecs_project_id
ON tasks_adviatecs(project_id);

CREATE INDEX idx_tasks_adviatecs_assigned_to
ON tasks_adviatecs(assigned_to);

CREATE INDEX idx_tasks_adviatecs_status
ON tasks_adviatecs(status);

CREATE INDEX idx_tasks_adviatecs_created_at
ON tasks_adviatecs(created_at);
-----------------------------------------------------------
Add user_profiles_adviatecs
Run this in the Neon SQL Editor:
CREATE TABLE user_profiles_adviatecs (
    user_id UUID PRIMARY KEY,
    phone VARCHAR(20),
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users_adviatecs(id)
        ON DELETE CASCADE
);