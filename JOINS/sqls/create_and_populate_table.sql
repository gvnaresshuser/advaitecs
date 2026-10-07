-- Create departments table
CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(100)
);


-- Create employees table
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  employee_name VARCHAR(100),
  department_id INT,

  FOREIGN KEY (department_id)
  REFERENCES departments(department_id)
  ON DELETE SET NULL
);

-- Create projects table
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(100)
);

-- Create employee_project_assignment table
CREATE TABLE employee_project_assignment (
    assignment_id SERIAL PRIMARY KEY,
    employee_id INT,
    project_id INT,
    assignment_date DATE,

    FOREIGN KEY (employee_id) 
    REFERENCES employees(employee_id)
    ON DELETE SET NULL,

    FOREIGN KEY (project_id) 
    REFERENCES projects(project_id)
    ON DELETE SET NULL
);

-- Populate departments table
INSERT INTO departments (department_name) VALUES
    ('Development'),
    ('Marketing'),
    ('Sales');

-- Populate employees table
INSERT INTO employees (employee_name, department_id) VALUES
    ('John Doe', 1),
    ('Jane Smith', 2),
    ('Bob Johnson', 1),
    ('Alice Williams', 3),
    ('Charlie Brown', 1),
    ('Eva Davis', 2);

-- Populate projects table
INSERT INTO projects (project_name) VALUES
    ('Website Redesign'),
    ('Social Media Campaign'),
    ('Mobile App Development'),
    ('Sales Training Program'),
    ('Market Research'),
    ('Customer Relationship Management');

-- Populate employee_project_assignment table
INSERT INTO employee_project_assignment (employee_id, project_id, assignment_date) VALUES
    (1, 1, '2023-01-10'),
    (2, 2, '2023-02-15'),
    (1, 3, '2023-03-20'),
    (4, 4, '2023-04-25'),
    (3, 5, '2023-05-30'),
    (6, 6, '2023-06-05'),
    (7, 4, '2023-07-10'),
    (8, 1, '2023-08-15');

