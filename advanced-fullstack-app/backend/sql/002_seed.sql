-- ============================================================
-- 002_seed.sql
-- Seed Data for Advanced Full-Stack Application
-- ============================================================

-- ============================================================
-- 1. ROLES
-- ============================================================

INSERT INTO roles_adviatecs (name)
VALUES
    ('ADMIN'),
    ('MANAGER'),
    ('DEVELOPER'),
    ('TESTER'),
    ('VIEWER')
ON CONFLICT (name) DO NOTHING;


-- ============================================================
-- 2. USERS
-- ============================================================

INSERT INTO users_adviatecs
    (name, email, password_hash)
VALUES
    ('Naresh', 'naresh@adviatecs.com', 'DEMO_HASH_NARESH'),
    ('Pranitha', 'pranitha@adviatecs.com', 'DEMO_HASH_PRANITHA'),
    ('Arjun', 'arjun@adviatecs.com', 'DEMO_HASH_ARJUN'),
    ('Sneha', 'sneha@adviatecs.com', 'DEMO_HASH_SNEHA'),
    ('Rahul', 'rahul@adviatecs.com', 'DEMO_HASH_RAHUL'),
    ('Priya', 'priya@adviatecs.com', 'DEMO_HASH_PRIYA'),
    ('Kiran', 'kiran@adviatecs.com', 'DEMO_HASH_KIRAN'),
    ('Anjali', 'anjali@adviatecs.com', 'DEMO_HASH_ANJALI')
ON CONFLICT (email) DO NOTHING;


-- ============================================================
-- 3. USER PROFILES
--    1 : 1 relationship with users
-- ============================================================

INSERT INTO user_profiles_adviatecs
    (user_id, phone, bio, avatar_url)
SELECT
    id,
    CASE email
        WHEN 'naresh@adviatecs.com' THEN '9000000001'
        WHEN 'pranitha@adviatecs.com' THEN '9000000002'
        WHEN 'arjun@adviatecs.com' THEN '9000000003'
        WHEN 'sneha@adviatecs.com' THEN '9000000004'
        WHEN 'rahul@adviatecs.com' THEN '9000000005'
        WHEN 'priya@adviatecs.com' THEN '9000000006'
        WHEN 'kiran@adviatecs.com' THEN '9000000007'
        WHEN 'anjali@adviatecs.com' THEN '9000000008'
    END,
    CASE email
        WHEN 'naresh@adviatecs.com' THEN 'Full Stack Trainer'
        WHEN 'pranitha@adviatecs.com' THEN 'Project Manager'
        WHEN 'arjun@adviatecs.com' THEN 'Senior Developer'
        WHEN 'sneha@adviatecs.com' THEN 'Frontend Developer'
        WHEN 'rahul@adviatecs.com' THEN 'Backend Developer'
        WHEN 'priya@adviatecs.com' THEN 'QA Engineer'
        WHEN 'kiran@adviatecs.com' THEN 'Developer'
        WHEN 'anjali@adviatecs.com' THEN 'UI Developer'
    END,
    NULL
FROM users_adviatecs
WHERE email IN (
    'naresh@adviatecs.com',
    'pranitha@adviatecs.com',
    'arjun@adviatecs.com',
    'sneha@adviatecs.com',
    'rahul@adviatecs.com',
    'priya@adviatecs.com',
    'kiran@adviatecs.com',
    'anjali@adviatecs.com'
)
ON CONFLICT (user_id) DO NOTHING;


-- ============================================================
-- 4. USER ROLES
--    M : M relationship
-- ============================================================

INSERT INTO user_roles_adviatecs (user_id, role_id)
SELECT u.id, r.id
FROM users_adviatecs u
CROSS JOIN roles_adviatecs r
WHERE
    (u.email = 'naresh@adviatecs.com' AND r.name = 'ADMIN')
 OR (u.email = 'pranitha@adviatecs.com' AND r.name = 'MANAGER')
 OR (u.email = 'arjun@adviatecs.com' AND r.name = 'DEVELOPER')
 OR (u.email = 'sneha@adviatecs.com' AND r.name = 'DEVELOPER')
 OR (u.email = 'rahul@adviatecs.com' AND r.name = 'DEVELOPER')
 OR (u.email = 'priya@adviatecs.com' AND r.name = 'TESTER')
 OR (u.email = 'kiran@adviatecs.com' AND r.name = 'DEVELOPER')
 OR (u.email = 'anjali@adviatecs.com' AND r.name = 'VIEWER')
ON CONFLICT (user_id, role_id) DO NOTHING;


-- ============================================================
-- 5. PROJECTS
--    User -> Projects = 1 : M
-- ============================================================

INSERT INTO projects_adviatecs
    (name, description, owner_id)
SELECT
    p.name,
    p.description,
    u.id
FROM (
    VALUES
        (
            'E-Commerce Platform',
            'Full-stack e-commerce application',
            'pranitha@adviatecs.com'
        ),
        (
            'AI Support System',
            'AI-powered customer support application',
            'arjun@adviatecs.com'
        ),
        (
            'Training Management',
            'Application for managing training batches',
            'naresh@adviatecs.com'
        ),
        (
            'Employee Portal',
            'Internal employee management system',
            'pranitha@adviatecs.com'
        )
) AS p(name, description, owner_email)
JOIN users_adviatecs u
    ON u.email = p.owner_email
WHERE NOT EXISTS (
    SELECT 1
    FROM projects_adviatecs existing
    WHERE existing.name = p.name
);


-- ============================================================
-- 6. PROJECT MEMBERS
--    Projects <-> Users = M : M
-- ============================================================

INSERT INTO project_members_adviatecs
    (project_id, user_id)
SELECT
    p.id,
    u.id
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON (
        (p.name = 'E-Commerce Platform'
            AND u.email IN (
                'pranitha@adviatecs.com',
                'arjun@adviatecs.com',
                'sneha@adviatecs.com',
                'priya@adviatecs.com'
            ))
        OR
        (p.name = 'AI Support System'
            AND u.email IN (
                'arjun@adviatecs.com',
                'rahul@adviatecs.com',
                'priya@adviatecs.com',
                'kiran@adviatecs.com'
            ))
        OR
        (p.name = 'Training Management'
            AND u.email IN (
                'naresh@adviatecs.com',
                'pranitha@adviatecs.com',
                'sneha@adviatecs.com'
            ))
        OR
        (p.name = 'Employee Portal'
            AND u.email IN (
                'pranitha@adviatecs.com',
                'rahul@adviatecs.com',
                'anjali@adviatecs.com'
            ))
    )
)
ON CONFLICT (project_id, user_id) DO NOTHING;


-- ============================================================
-- 7. TASKS
--    Project -> Tasks = 1 : M
-- ============================================================

INSERT INTO tasks_adviatecs
    (
        project_id,
        assigned_to,
        title,
        description,
        status,
        priority,
        due_date
    )
SELECT
    p.id,
    u.id,
    t.title,
    t.description,
    t.status,
    t.priority,
    t.due_date
FROM (
    VALUES
        (
            'E-Commerce Platform',
            'arjun@adviatecs.com',
            'Design database schema',
            'Create PostgreSQL database schema',
            'DONE',
            'HIGH',
            CURRENT_DATE - 10
        ),
        (
            'E-Commerce Platform',
            'sneha@adviatecs.com',
            'Build product page',
            'Create responsive product page',
            'IN_PROGRESS',
            'HIGH',
            CURRENT_DATE + 5
        ),
        (
            'E-Commerce Platform',
            'priya@adviatecs.com',
            'Write API tests',
            'Test product and order APIs',
            'TODO',
            'MEDIUM',
            CURRENT_DATE + 10
        ),
        (
            'E-Commerce Platform',
            'arjun@adviatecs.com',
            'Implement authentication',
            'Implement JWT authentication',
            'DONE',
            'HIGH',
            CURRENT_DATE - 5
        ),
        (
            'AI Support System',
            'rahul@adviatecs.com',
            'Create AI service',
            'Integrate LLM API',
            'DONE',
            'HIGH',
            CURRENT_DATE - 7
        ),
        (
            'AI Support System',
            'kiran@adviatecs.com',
            'Build chat interface',
            'Create React chat interface',
            'IN_PROGRESS',
            'HIGH',
            CURRENT_DATE + 4
        ),
        (
            'AI Support System',
            'priya@adviatecs.com',
            'Test AI responses',
            'Test response quality and errors',
            'TODO',
            'MEDIUM',
            CURRENT_DATE + 12
        ),
        (
            'AI Support System',
            'rahul@adviatecs.com',
            'Add error handling',
            'Implement centralized error handling',
            'IN_PROGRESS',
            'MEDIUM',
            CURRENT_DATE + 3
        ),
        (
            'Training Management',
            'sneha@adviatecs.com',
            'Create batch module',
            'Build training batch management',
            'DONE',
            'MEDIUM',
            CURRENT_DATE - 15
        ),
        (
            'Training Management',
            'naresh@adviatecs.com',
            'Create student module',
            'Build student management functionality',
            'IN_PROGRESS',
            'HIGH',
            CURRENT_DATE + 6
        ),
        (
            'Training Management',
            'sneha@adviatecs.com',
            'Create attendance module',
            'Track student attendance',
            'TODO',
            'LOW',
            CURRENT_DATE + 15
        ),
        (
            'Employee Portal',
            'rahul@adviatecs.com',
            'Create employee API',
            'Build employee REST APIs',
            'DONE',
            'HIGH',
            CURRENT_DATE - 12
        ),
        (
            'Employee Portal',
            'anjali@adviatecs.com',
            'Build dashboard',
            'Create employee dashboard',
            'IN_PROGRESS',
            'MEDIUM',
            CURRENT_DATE + 8
        ),
        (
            'Employee Portal',
            'rahul@adviatecs.com',
            'Implement authorization',
            'Implement role-based access',
            'TODO',
            'HIGH',
            CURRENT_DATE + 14
        )
) AS t(
    project_name,
    assigned_email,
    title,
    description,
    status,
    priority,
    due_date
)
JOIN projects_adviatecs p
    ON p.name = t.project_name
JOIN users_adviatecs u
    ON u.email = t.assigned_email;


-- ============================================================
-- 8. COMMENTS
--    Task -> Comments = 1 : M
--    User -> Comments = 1 : M
-- ============================================================

INSERT INTO comments_adviatecs
    (task_id, user_id, content)
SELECT
    t.id,
    u.id,
    c.content
FROM (
    VALUES
        (
            'Design database schema',
            'naresh@adviatecs.com',
            'Please make sure all foreign keys are properly defined.'
        ),
        (
            'Design database schema',
            'arjun@adviatecs.com',
            'Schema has been reviewed and completed.'
        ),
        (
            'Build product page',
            'pranitha@adviatecs.com',
            'Please make the page responsive.'
        ),
        (
            'Create AI service',
            'arjun@adviatecs.com',
            'Use the provider abstraction so we can change LLM providers.'
        ),
        (
            'Build chat interface',
            'kiran@adviatecs.com',
            'The UI should look like a real AI chat application.'
        ),
        (
            'Create batch module',
            'naresh@adviatecs.com',
            'Please include pagination for the batch list.'
        ),
        (
            'Create student module',
            'naresh@adviatecs.com',
            'Student search and filtering will be required.'
        ),
        (
            'Create employee API',
            'pranitha@adviatecs.com',
            'Please add validation for all request bodies.'
        ),
        (
            'Build dashboard',
            'anjali@adviatecs.com',
            'Dashboard should display employee statistics.'
        )
) AS c(
    task_title,
    comment_email,
    content
)
JOIN tasks_adviatecs t
    ON t.title = c.task_title
JOIN users_adviatecs u
    ON u.email = c.comment_email;


-- ============================================================
-- SEED COMPLETE
-- ============================================================