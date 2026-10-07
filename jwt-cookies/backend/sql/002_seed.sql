-- ============================================================
-- ROLES
-- ============================================================

INSERT INTO roles_advaitecs_jwt_cookies
    (name, description)
VALUES
    ('USER', 'Regular authenticated user'),
    ('ADMIN', 'Administrator with elevated permissions')
ON CONFLICT (name) DO NOTHING;