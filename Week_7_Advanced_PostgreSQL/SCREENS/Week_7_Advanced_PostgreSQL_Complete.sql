-- ============================================================
-- WEEK 7 - ADVANCED POSTGRESQL
-- Complete Database Script
-- Project: Advaitecs Advanced PostgreSQL
-- ============================================================
--
-- CURRENT DATABASE STATE VERIFIED:
--   Tables    : 4
--   Sequences : 3
--   Indexes   : 9
--
-- Tables:
--   departments_advaitecs_advpgsql
--   employees_advaitecs_advpgsql
--   projects_advaitecs_advpgsql
--   employee_projects_advaitecs_advpgsql
--
-- IMPORTANT:
-- The two indexes below do NOT contain "advaitecs_advpgsql"
-- in their index names, but they DO exist on the employees
-- table:
--   idx_employees_department_id_advaitecs
--   idx_employees_email_advaitecs
--
-- ============================================================

-- ============================================================
-- 1. CLEANUP
-- ============================================================
-- WARNING: Deletes the existing training tables and data.
-- Use only when recreating the database from scratch.
-- ============================================================

DROP TABLE IF EXISTS employee_projects_advaitecs_advpgsql CASCADE;
DROP TABLE IF EXISTS employees_advaitecs_advpgsql CASCADE;
DROP TABLE IF EXISTS projects_advaitecs_advpgsql CASCADE;
DROP TABLE IF EXISTS departments_advaitecs_advpgsql CASCADE;


-- ============================================================
-- 2. CREATE TABLES
-- ============================================================

CREATE TABLE departments_advaitecs_advpgsql (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE employees_advaitecs_advpgsql (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    salary NUMERIC(10,2),
    department_id INT,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id)
        REFERENCES departments_advaitecs_advpgsql(department_id)
);

CREATE TABLE projects_advaitecs_advpgsql (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    budget NUMERIC(12,2)
);

CREATE TABLE employee_projects_advaitecs_advpgsql (
    employee_id INT,
    project_id INT,

    PRIMARY KEY (employee_id, project_id),

    CONSTRAINT fk_employee_project_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees_advaitecs_advpgsql(employee_id),

    CONSTRAINT fk_employee_project_project
        FOREIGN KEY (project_id)
        REFERENCES projects_advaitecs_advpgsql(project_id)
);


-- ============================================================
-- 3. SEED DATA
-- ============================================================

INSERT INTO departments_advaitecs_advpgsql
    (department_name)
VALUES
    ('Development'),
    ('Testing'),
    ('HR'),
    ('Database');

INSERT INTO employees_advaitecs_advpgsql
    (employee_name, email, salary, department_id)
VALUES
    ('Ravi',  'ravi@example.com',  75000, 1),
    ('Priya', 'priya@example.com', 85000, 1),
    ('Arun',  'arun@example.com',  65000, 2),
    ('Sneha', 'sneha@example.com', 55000, 3),
    ('Kiran', 'kiran@example.com', 90000, 4),
    ('Meena', 'meena@example.com', 70000, 1);

INSERT INTO projects_advaitecs_advpgsql
    (project_name, budget)
VALUES
    ('E-Commerce Application', 500000),
    ('Banking Application', 750000),
    ('HR Management System', 300000);

INSERT INTO employee_projects_advaitecs_advpgsql
    (employee_id, project_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (3, 2),
    (5, 3);


-- ============================================================
-- 4. INDEXES
-- ============================================================
--
-- Automatic indexes created by PostgreSQL:
--
-- 1. departments_advaitecs_advpgsql_pkey
-- 2. employee_projects_advaitecs_advpgsql_pkey
-- 3. employees_advaitecs_advpgsql_pkey
-- 4. employees_advaitecs_advpgsql_email_key
-- 5. projects_advaitecs_advpgsql_pkey
--
-- Explicit indexes currently present:
--
-- 6. idx_employee_department_advaitecs_advpgsql
-- 7. idx_employee_name_advaitecs_advpgsql
-- 8. idx_employees_department_id_advaitecs
-- 9. idx_employees_email_advaitecs
--
-- NOTE:
-- The last two explicit indexes are duplicates in purpose:
--   department_id has two indexes
--   email already has a UNIQUE index
--
-- They are included here because this script represents the
-- CURRENT DATABASE STATE that was verified.
-- ============================================================

CREATE INDEX idx_employee_department_advaitecs_advpgsql
ON employees_advaitecs_advpgsql(department_id);

CREATE INDEX idx_employee_name_advaitecs_advpgsql
ON employees_advaitecs_advpgsql(employee_name);

CREATE INDEX idx_employees_department_id_advaitecs
ON employees_advaitecs_advpgsql(department_id);

CREATE INDEX idx_employees_email_advaitecs
ON employees_advaitecs_advpgsql(email);


-- ============================================================
-- 5. VERIFY TABLES
-- ============================================================

SELECT
    schemaname,
    tablename
FROM pg_tables
WHERE tablename ILIKE '%advaitecs_advpgsql%'
ORDER BY tablename;


-- ============================================================
-- 6. VERIFY ALL INDEXES
-- ============================================================

SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE indexname ILIKE '%advaitecs_advpgsql%'
   OR tablename ILIKE '%advaitecs_advpgsql%'
ORDER BY tablename, indexname;


-- ============================================================
-- 7. FIND ALL OBJECTS WHOSE NAME CONTAINS
--    advaitecs_advpgsql
-- ============================================================

SELECT
    n.nspname AS schema_name,
    c.relname AS object_name,
    CASE c.relkind
        WHEN 'r' THEN 'TABLE'
        WHEN 'i' THEN 'INDEX'
        WHEN 'S' THEN 'SEQUENCE'
        WHEN 'v' THEN 'VIEW'
        WHEN 'm' THEN 'MATERIALIZED VIEW'
        WHEN 'p' THEN 'PARTITIONED TABLE'
        WHEN 'f' THEN 'FOREIGN TABLE'
        ELSE c.relkind::text
    END AS object_type
FROM pg_class c
JOIN pg_namespace n
    ON n.oid = c.relnamespace
WHERE c.relname ILIKE '%advaitecs_advpgsql%'
ORDER BY object_type, object_name;


-- ============================================================
-- 8. COUNT OBJECTS WHOSE NAME CONTAINS
--    advaitecs_advpgsql
-- ============================================================

SELECT
    CASE c.relkind
        WHEN 'r' THEN 'TABLE'
        WHEN 'i' THEN 'INDEX'
        WHEN 'S' THEN 'SEQUENCE'
        WHEN 'v' THEN 'VIEW'
        WHEN 'm' THEN 'MATERIALIZED VIEW'
        WHEN 'p' THEN 'PARTITIONED TABLE'
        WHEN 'f' THEN 'FOREIGN TABLE'
        ELSE c.relkind::text
    END AS object_type,
    COUNT(*) AS object_count
FROM pg_class c
JOIN pg_namespace n
    ON n.oid = c.relnamespace
WHERE c.relname ILIKE '%advaitecs_advpgsql%'
GROUP BY c.relkind
ORDER BY object_type;


-- ============================================================
-- 9. VERIFY TABLE DATA
-- ============================================================

SELECT *
FROM departments_advaitecs_advpgsql
ORDER BY department_id;

SELECT *
FROM employees_advaitecs_advpgsql
ORDER BY employee_id;

SELECT *
FROM projects_advaitecs_advpgsql
ORDER BY project_id;

SELECT *
FROM employee_projects_advaitecs_advpgsql
ORDER BY employee_id, project_id;


-- ============================================================
-- 10. INDEX / QUERY PERFORMANCE PRACTICE
-- ============================================================

EXPLAIN ANALYZE
SELECT *
FROM employees_advaitecs_advpgsql
WHERE employee_name = 'Ravi';

EXPLAIN ANALYZE
SELECT *
FROM employees_advaitecs_advpgsql
WHERE department_id = 1;

EXPLAIN ANALYZE
SELECT *
FROM employees_advaitecs_advpgsql
WHERE email = 'ravi@example.com';


-- ============================================================
-- END
-- ============================================================
