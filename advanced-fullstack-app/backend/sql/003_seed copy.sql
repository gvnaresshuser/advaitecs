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
-- ---------------------------------------------------------------
INSERT INTO project_members_adviatecs (project_id, user_id)
SELECT p.id, u.id
FROM projects_adviatecs p
CROSS JOIN users_adviatecs u
WHERE
    (p.name = 'E-Commerce Platform'
        AND u.email IN (
            'pranitha@adviatecs.com',
            'arjun@adviatecs.com',
            'sneha@adviatecs.com',
            'priya@adviatecs.com'
        ))
 OR (p.name = 'AI Support System'
        AND u.email IN (
            'arjun@adviatecs.com',
            'rahul@adviatecs.com',
            'priya@adviatecs.com',
            'kiran@adviatecs.com'
        ))
 OR (p.name = 'Training Management'
        AND u.email IN (
            'naresh@adviatecs.com',
            'pranitha@adviatecs.com',
            'sneha@adviatecs.com'
        ))
 OR (p.name = 'Employee Portal'
        AND u.email IN (
            'pranitha@adviatecs.com',
            'rahul@adviatecs.com',
            'anjali@adviatecs.com'
        ))
ON CONFLICT (project_id, user_id) DO NOTHING;
-- ---------------------------------------------------------------
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
VALUES

(
    (SELECT id FROM projects_adviatecs WHERE name = 'E-Commerce Platform'),
    (SELECT id FROM users_adviatecs WHERE email = 'arjun@adviatecs.com'),
    'Design database schema',
    'Create PostgreSQL database schema',
    'DONE',
    'HIGH',
    CURRENT_DATE - 10
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'E-Commerce Platform'),
    (SELECT id FROM users_adviatecs WHERE email = 'sneha@adviatecs.com'),
    'Build product page',
    'Create responsive product page',
    'IN_PROGRESS',
    'HIGH',
    CURRENT_DATE + 5
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'E-Commerce Platform'),
    (SELECT id FROM users_adviatecs WHERE email = 'priya@adviatecs.com'),
    'Write API tests',
    'Test product and order APIs',
    'TODO',
    'MEDIUM',
    CURRENT_DATE + 10
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'E-Commerce Platform'),
    (SELECT id FROM users_adviatecs WHERE email = 'arjun@adviatecs.com'),
    'Implement authentication',
    'Implement JWT authentication',
    'DONE',
    'HIGH',
    CURRENT_DATE - 5
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'AI Support System'),
    (SELECT id FROM users_adviatecs WHERE email = 'rahul@adviatecs.com'),
    'Create AI service',
    'Integrate LLM API',
    'DONE',
    'HIGH',
    CURRENT_DATE - 7
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'AI Support System'),
    (SELECT id FROM users_adviatecs WHERE email = 'kiran@adviatecs.com'),
    'Build chat interface',
    'Create React chat interface',
    'IN_PROGRESS',
    'HIGH',
    CURRENT_DATE + 4
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'AI Support System'),
    (SELECT id FROM users_adviatecs WHERE email = 'priya@adviatecs.com'),
    'Test AI responses',
    'Test response quality and errors',
    'TODO',
    'MEDIUM',
    CURRENT_DATE + 12
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'AI Support System'),
    (SELECT id FROM users_adviatecs WHERE email = 'rahul@adviatecs.com'),
    'Add error handling',
    'Implement centralized error handling',
    'IN_PROGRESS',
    'MEDIUM',
    CURRENT_DATE + 3
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'Training Management'),
    (SELECT id FROM users_adviatecs WHERE email = 'sneha@adviatecs.com'),
    'Create batch module',
    'Build training batch management',
    'DONE',
    'MEDIUM',
    CURRENT_DATE - 15
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'Training Management'),
    (SELECT id FROM users_adviatecs WHERE email = 'naresh@adviatecs.com'),
    'Create student module',
    'Build student management functionality',
    'IN_PROGRESS',
    'HIGH',
    CURRENT_DATE + 6
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'Training Management'),
    (SELECT id FROM users_adviatecs WHERE email = 'sneha@adviatecs.com'),
    'Create attendance module',
    'Track student attendance',
    'TODO',
    'LOW',
    CURRENT_DATE + 15
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'Employee Portal'),
    (SELECT id FROM users_adviatecs WHERE email = 'rahul@adviatecs.com'),
    'Create employee API',
    'Build employee REST APIs',
    'DONE',
    'HIGH',
    CURRENT_DATE - 12
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'Employee Portal'),
    (SELECT id FROM users_adviatecs WHERE email = 'anjali@adviatecs.com'),
    'Build dashboard',
    'Create employee dashboard',
    'IN_PROGRESS',
    'MEDIUM',
    CURRENT_DATE + 8
),

(
    (SELECT id FROM projects_adviatecs WHERE name = 'Employee Portal'),
    (SELECT id FROM users_adviatecs WHERE email = 'rahul@adviatecs.com'),
    'Implement authorization',
    'Implement role-based access',
    'TODO',
    'HIGH',
    CURRENT_DATE + 14
);
---------------------------------------------------------
INSERT INTO comments_adviatecs
(
    task_id,
    user_id,
    content
)
VALUES

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Design database schema'),
    (SELECT id FROM users_adviatecs WHERE email = 'naresh@adviatecs.com'),
    'Please make sure all foreign keys are properly defined.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Design database schema'),
    (SELECT id FROM users_adviatecs WHERE email = 'arjun@adviatecs.com'),
    'Schema has been reviewed and completed.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Build product page'),
    (SELECT id FROM users_adviatecs WHERE email = 'pranitha@adviatecs.com'),
    'Please make the page responsive.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Create AI service'),
    (SELECT id FROM users_adviatecs WHERE email = 'arjun@adviatecs.com'),
    'Use the provider abstraction so we can change LLM providers.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Build chat interface'),
    (SELECT id FROM users_adviatecs WHERE email = 'kiran@adviatecs.com'),
    'The UI should look like a real AI chat application.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Create batch module'),
    (SELECT id FROM users_adviatecs WHERE email = 'naresh@adviatecs.com'),
    'Please include pagination for the batch list.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Create student module'),
    (SELECT id FROM users_adviatecs WHERE email = 'naresh@adviatecs.com'),
    'Student search and filtering will be required.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Create employee API'),
    (SELECT id FROM users_adviatecs WHERE email = 'pranitha@adviatecs.com'),
    'Please add validation for all request bodies.'
),

(
    (SELECT id FROM tasks_adviatecs WHERE title = 'Build dashboard'),
    (SELECT id FROM users_adviatecs WHERE email = 'anjali@adviatecs.com'),
    'Dashboard should display employee statistics.'
);