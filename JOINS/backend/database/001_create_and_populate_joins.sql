-- ============================================================
-- PostgreSQL JOIN Demonstration
-- Advaitecs Training Project
-- ============================================================


-- ============================================================
-- 1. DROP TABLES IF THEY ALREADY EXIST
-- ============================================================

DROP TABLE IF EXISTS employee_project_assignment_advaitecs_joins;
DROP TABLE IF EXISTS employees_advaitecs_joins;
DROP TABLE IF EXISTS projects_advaitecs_joins;
DROP TABLE IF EXISTS departments_advaitecs_joins;


-- ============================================================
-- 2. CREATE DEPARTMENTS TABLE
-- ============================================================

CREATE TABLE departments_advaitecs_joins (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100)
);


-- ============================================================
-- 3. CREATE EMPLOYEES TABLE
-- ============================================================

CREATE TABLE employees_advaitecs_joins (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100),
    department_id INT,

    FOREIGN KEY (department_id)
        REFERENCES departments_advaitecs_joins(department_id)
        ON DELETE SET NULL
);


-- ============================================================
-- 4. CREATE PROJECTS TABLE
-- ============================================================

CREATE TABLE projects_advaitecs_joins (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100)
);


-- ============================================================
-- 5. CREATE EMPLOYEE PROJECT ASSIGNMENT TABLE
-- ============================================================

CREATE TABLE employee_project_assignment_advaitecs_joins (
    assignment_id SERIAL PRIMARY KEY,
    employee_id INT,
    project_id INT,
    assignment_date DATE,

    FOREIGN KEY (employee_id)
        REFERENCES employees_advaitecs_joins(employee_id)
        ON DELETE SET NULL,

    FOREIGN KEY (project_id)
        REFERENCES projects_advaitecs_joins(project_id)
        ON DELETE SET NULL
);


-- ============================================================
-- 6. INSERT DEPARTMENTS
-- ============================================================

INSERT INTO departments_advaitecs_joins
    (department_name)
VALUES
    ('Development'),
    ('Marketing'),
    ('Sales');


-- ============================================================
-- 7. INSERT EMPLOYEES WITH DEPARTMENTS
-- ============================================================

INSERT INTO employees_advaitecs_joins
    (employee_name, department_id)
VALUES
    ('John Doe', 1),
    ('Jane Smith', 2),
    ('Bob Johnson', 1),
    ('Alice Williams', 3),
    ('Charlie Brown', 1),
    ('Eva Davis', 2);


-- ============================================================
-- 8. INSERT PROJECTS
-- ============================================================

INSERT INTO projects_advaitecs_joins
    (project_name)
VALUES
    ('Website Redesign'),
    ('Social Media Campaign'),
    ('Mobile App Development'),
    ('Sales Training Program'),
    ('Market Research'),
    ('Customer Relationship Management');


-- ============================================================
-- 9. INSERT EMPLOYEES WITHOUT DEPARTMENT
-- ============================================================
-- These records are important for demonstrating:
--
-- LEFT JOIN
-- FULL OUTER JOIN
-- IS NULL
-- Employees without department
-- ============================================================

INSERT INTO employees_advaitecs_joins
    (employee_name)
VALUES
    ('Elena Sterling'),
    ('Victor Bennett');


-- ============================================================
-- 10. INSERT DEPARTMENT WITHOUT EMPLOYEES
-- ============================================================
-- Important for demonstrating:
--
-- RIGHT JOIN
-- FULL OUTER JOIN
-- Departments without employees
-- ============================================================

INSERT INTO departments_advaitecs_joins
    (department_name)
VALUES
    ('Technical Support');


-- ============================================================
-- 11. INSERT EMPLOYEE PROJECT ASSIGNMENTS
-- ============================================================

INSERT INTO employee_project_assignment_advaitecs_joins
    (employee_id, project_id, assignment_date)
VALUES
    (1, 1, '2023-01-10'),
    (2, 2, '2023-02-15'),
    (1, 3, '2023-03-20'),
    (4, 4, '2023-04-25'),
    (3, 5, '2023-05-30'),
    (6, 6, '2023-06-05'),
    (7, 4, '2023-07-10'),
    (8, 1, '2023-08-15');


-- ============================================================
-- 12. VERIFY TABLES
-- ============================================================

SELECT *
FROM departments_advaitecs_joins;

SELECT *
FROM employees_advaitecs_joins;

SELECT *
FROM projects_advaitecs_joins;

SELECT *
FROM employee_project_assignment_advaitecs_joins;