-- week7_advanced_postgresql.sql

-- ============================================================
-- WEEK 7 - ADVANCED POSTGRESQL
-- Advaitecs Training Project
-- ============================================================
-- Topics covered:
-- 1. Table Relationships
-- 2. Primary Keys
-- 3. Foreign Keys
-- 4. INNER JOIN
-- 5. LEFT JOIN
-- 6. Many-to-Many Relationships
-- 7. Aggregate Functions
-- 8. GROUP BY
-- 9. HAVING
-- 10. Pagination
-- 11. Indexes
-- ============================================================


-- ============================================================
-- 1. DEPARTMENTS TABLE
-- ============================================================

CREATE TABLE departments_advaitecs_advpgsql (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);


-- ============================================================
-- 2. EMPLOYEES TABLE
-- ============================================================

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


-- ============================================================
-- 3. PROJECTS TABLE
-- ============================================================

CREATE TABLE projects_advaitecs_advpgsql (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    budget NUMERIC(12,2)
);


-- ============================================================
-- 4. EMPLOYEE_PROJECTS TABLE
-- Many-to-Many Relationship
-- ============================================================

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
-- 5. DEPARTMENTS - SEED DATA
-- ============================================================

INSERT INTO departments_advaitecs_advpgsql
(department_name)
VALUES
('Development'),
('Testing'),
('HR'),
('Database');


-- ============================================================
-- 6. EMPLOYEES - SEED DATA
-- ============================================================

INSERT INTO employees_advaitecs_advpgsql
(employee_name, email, salary, department_id)
VALUES
('Ravi', 'ravi@example.com', 75000, 1),
('Priya', 'priya@example.com', 85000, 1),
('Arun', 'arun@example.com', 65000, 2),
('Sneha', 'sneha@example.com', 55000, 3),
('Kiran', 'kiran@example.com', 90000, 4),
('Meena', 'meena@example.com', 70000, 1);


-- ============================================================
-- 7. PROJECTS - SEED DATA
-- ============================================================

INSERT INTO projects_advaitecs_advpgsql
(project_name, budget)
VALUES
('E-Commerce Application', 500000),
('Banking Application', 750000),
('HR Management System', 300000);


-- ============================================================
-- 8. EMPLOYEE_PROJECTS - SEED DATA
-- ============================================================

INSERT INTO employee_projects_advaitecs_advpgsql
(employee_id, project_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2),
(5, 3);


-- ============================================================
-- 9. INDEX - EMPLOYEE DEPARTMENT
-- ============================================================
-- Useful for queries involving department_id,
-- JOINs and filtering by department.
-- ============================================================

CREATE INDEX IF NOT EXISTS
idx_employees_department_id_advaitecs
ON employees_advaitecs_advpgsql(department_id);


-- ============================================================
-- 10. VERIFY TABLES
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
-- 11. VERIFY INDEXES
-- ============================================================

SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'employees_advaitecs_advpgsql';


-- ============================================================
-- 12. BASIC RELATIONSHIP CHECK
-- ============================================================

SELECT
    e.employee_id,
    e.employee_name,
    d.department_name
FROM employees_advaitecs_advpgsql e
INNER JOIN departments_advaitecs_advpgsql d
    ON e.department_id = d.department_id
ORDER BY e.employee_id;


-- ============================================================
-- END OF WEEK 7 DATABASE SCRIPT
-- ============================================================