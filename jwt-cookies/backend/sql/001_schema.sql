-- ============================================================
-- JWT COOKIES DEMONSTRATION DATABASE
-- Advaitecs
-- ============================================================

-- ============================================================
-- 1. ROLES
-- ============================================================

CREATE TABLE IF NOT EXISTS roles_advaitecs_jwt_cookies (
    id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL UNIQUE,

    description VARCHAR(255),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. USERS
-- ============================================================

CREATE TABLE IF NOT EXISTS users_advaitecs_jwt_cookies (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. USER ROLES
-- ============================================================

CREATE TABLE IF NOT EXISTS user_roles_advaitecs_jwt_cookies (
    user_id INTEGER NOT NULL,

    role_id INTEGER NOT NULL,

    assigned_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, role_id),

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users_advaitecs_jwt_cookies(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles_advaitecs_jwt_cookies(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 4. REFRESH TOKENS / SESSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS refresh_tokens_advaitecs_jwt_cookies (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    token_hash TEXT NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    revoked_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_refresh_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users_advaitecs_jwt_cookies(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 5. PROJECTS
-- ============================================================

CREATE TABLE IF NOT EXISTS projects_advaitecs_jwt_cookies (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    owner_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_projects_owner
        FOREIGN KEY (owner_id)
        REFERENCES users_advaitecs_jwt_cookies(id)
        ON DELETE CASCADE
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_users_email_advaitecs_jwt_cookies
ON users_advaitecs_jwt_cookies(email);


CREATE INDEX IF NOT EXISTS idx_user_roles_user_id_advaitecs_jwt_cookies
ON user_roles_advaitecs_jwt_cookies(user_id);


CREATE INDEX IF NOT EXISTS idx_user_roles_role_id_advaitecs_jwt_cookies
ON user_roles_advaitecs_jwt_cookies(role_id);


CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id_advaitecs_jwt_cookies
ON refresh_tokens_advaitecs_jwt_cookies(user_id);


CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at_advaitecs_jwt_cookies
ON refresh_tokens_advaitecs_jwt_cookies(expires_at);


CREATE INDEX IF NOT EXISTS idx_projects_owner_id_advaitecs_jwt_cookies
ON projects_advaitecs_jwt_cookies(owner_id);