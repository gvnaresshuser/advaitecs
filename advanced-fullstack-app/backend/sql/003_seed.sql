-- ============================================================
-- 003_seed.sql
-- Project, Project Member, Task and Comment Seed Data
-- ============================================================

-- ============================================================
-- 1. PROJECTS
-- ============================================================

INSERT INTO projects_adviatecs
    (name, description, owner_id)
SELECT
    'AI Support System',
    'AI-powered customer support application',
    id
FROM users_adviatecs
WHERE email = 'arjun@adviatecs.com'
  AND NOT EXISTS (
      SELECT 1
      FROM projects_adviatecs
      WHERE name = 'AI Support System'
  );


-- ============================================================
-- 2. PROJECT MEMBERS
-- ============================================================

INSERT INTO project_members_adviatecs
    (project_id, user_id)

SELECT
    p.id,
    u.id

FROM projects_adviatecs p

CROSS JOIN users_adviatecs u

WHERE
    (
        p.name = 'E-Commerce Platform'
        AND u.email IN (
            'pranitha@adviatecs.com',
            'arjun@adviatecs.com',
            'sneha@adviatecs.com',
            'priya@adviatecs.com'
        )
    )

    OR

    (
        p.name = 'AI Support System'
        AND u.email IN (
            'arjun@adviatecs.com',
            'rahul@adviatecs.com',
            'priya@adviatecs.com',
            'kiran@adviatecs.com'
        )
    )

    OR

    (
        p.name = 'Training Management'
        AND u.email IN (
            'naresh@adviatecs.com',
            'pranitha@adviatecs.com',
            'sneha@adviatecs.com'
        )
    )

    OR

    (
        p.name = 'Employee Portal'
        AND u.email IN (
            'pranitha@adviatecs.com',
            'rahul@adviatecs.com',
            'anjali@adviatecs.com'
        )
    )

ON CONFLICT (project_id, user_id)
DO NOTHING;


-- ============================================================
-- 3. TASKS
-- ============================================================

-- E-Commerce Platform
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
    'Design database schema',
    'Create PostgreSQL database schema',
    'DONE',
    'HIGH',
    CURRENT_DATE - 10
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'arjun@adviatecs.com'
WHERE p.name = 'E-Commerce Platform'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Design database schema'
  );


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
    'Build product page',
    'Create responsive product page',
    'IN_PROGRESS',
    'HIGH',
    CURRENT_DATE + 5
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'sneha@adviatecs.com'
WHERE p.name = 'E-Commerce Platform'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Build product page'
  );


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
    'Write API tests',
    'Test product and order APIs',
    'TODO',
    'MEDIUM',
    CURRENT_DATE + 10
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'priya@adviatecs.com'
WHERE p.name = 'E-Commerce Platform'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Write API tests'
  );


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
    'Implement authentication',
    'Implement JWT authentication',
    'DONE',
    'HIGH',
    CURRENT_DATE - 5
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'arjun@adviatecs.com'
WHERE p.name = 'E-Commerce Platform'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Implement authentication'
  );


-- ============================================================
-- AI Support System
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
    'Create AI service',
    'Integrate LLM API',
    'DONE',
    'HIGH',
    CURRENT_DATE - 7
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'rahul@adviatecs.com'
WHERE p.name = 'AI Support System'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Create AI service'
  );


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
    'Build chat interface',
    'Create React chat interface',
    'IN_PROGRESS',
    'HIGH',
    CURRENT_DATE + 4
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'kiran@adviatecs.com'
WHERE p.name = 'AI Support System'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Build chat interface'
  );


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
    'Test AI responses',
    'Test response quality and errors',
    'TODO',
    'MEDIUM',
    CURRENT_DATE + 12
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'priya@adviatecs.com'
WHERE p.name = 'AI Support System'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Test AI responses'
  );


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
    'Add error handling',
    'Implement centralized error handling',
    'IN_PROGRESS',
    'MEDIUM',
    CURRENT_DATE + 3
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'rahul@adviatecs.com'
WHERE p.name = 'AI Support System'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Add error handling'
  );


-- ============================================================
-- Training Management
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
    'Create batch module',
    'Build training batch management',
    'DONE',
    'MEDIUM',
    CURRENT_DATE - 15
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'sneha@adviatecs.com'
WHERE p.name = 'Training Management'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Create batch module'
  );


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
    'Create student module',
    'Build student management functionality',
    'IN_PROGRESS',
    'HIGH',
    CURRENT_DATE + 6
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'naresh@adviatecs.com'
WHERE p.name = 'Training Management'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Create student module'
  );


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
    'Create attendance module',
    'Track student attendance',
    'TODO',
    'LOW',
    CURRENT_DATE + 15
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'sneha@adviatecs.com'
WHERE p.name = 'Training Management'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Create attendance module'
  );


-- ============================================================
-- Employee Portal
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
    'Create employee API',
    'Build employee REST APIs',
    'DONE',
    'HIGH',
    CURRENT_DATE - 12
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'rahul@adviatecs.com'
WHERE p.name = 'Employee Portal'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Create employee API'
  );


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
    'Build dashboard',
    'Create employee dashboard',
    'IN_PROGRESS',
    'MEDIUM',
    CURRENT_DATE + 8
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'anjali@adviatecs.com'
WHERE p.name = 'Employee Portal'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Build dashboard'
  );


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
    'Implement authorization',
    'Implement role-based access',
    'TODO',
    'HIGH',
    CURRENT_DATE + 14
FROM projects_adviatecs p
JOIN users_adviatecs u
    ON u.email = 'rahul@adviatecs.com'
WHERE p.name = 'Employee Portal'
  AND NOT EXISTS (
      SELECT 1
      FROM tasks_adviatecs t
      WHERE t.project_id = p.id
        AND t.title = 'Implement authorization'
  );


-- ============================================================
-- 4. COMMENTS
-- ============================================================

INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Please make sure all foreign keys are properly defined.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'naresh@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'E-Commerce Platform'
  AND t.title = 'Design database schema'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Please make sure all foreign keys are properly defined.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Schema has been reviewed and completed.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'arjun@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'E-Commerce Platform'
  AND t.title = 'Design database schema'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Schema has been reviewed and completed.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Please make the page responsive.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'pranitha@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'E-Commerce Platform'
  AND t.title = 'Build product page'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Please make the page responsive.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Use the provider abstraction so we can change LLM providers.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'arjun@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'AI Support System'
  AND t.title = 'Create AI service'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Use the provider abstraction so we can change LLM providers.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'The UI should look like a real AI chat application.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'kiran@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'AI Support System'
  AND t.title = 'Build chat interface'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'The UI should look like a real AI chat application.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Please include pagination for the batch list.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'naresh@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'Training Management'
  AND t.title = 'Create batch module'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Please include pagination for the batch list.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Student search and filtering will be required.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'naresh@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'Training Management'
  AND t.title = 'Create student module'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Student search and filtering will be required.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Please add validation for all request bodies.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'pranitha@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'Employee Portal'
  AND t.title = 'Create employee API'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Please add validation for all request bodies.'
  );


INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
SELECT
    t.id,
    u.id,
    'Dashboard should display employee statistics.'
FROM tasks_adviatecs t
JOIN users_adviatecs u
    ON u.email = 'anjali@adviatecs.com'
JOIN projects_adviatecs p
    ON p.id = t.project_id
WHERE p.name = 'Employee Portal'
  AND t.title = 'Build dashboard'
  AND NOT EXISTS (
      SELECT 1
      FROM comments_adviatecs c
      WHERE c.task_id = t.id
        AND c.user_id = u.id
        AND c.content = 'Dashboard should display employee statistics.'
  );