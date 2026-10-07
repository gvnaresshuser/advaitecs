--LEFT JOIN

-- GET all employees, then their departments if they have belong to one
SELECT employee_name, department_name FROM employees LEFT JOIN departments ON employees.department_id = departments.department_id;
-- OR
SELECT employee_name, department_name FROM employees LEFT JOIN departments USING (department_id);

-- GET employees with no department
SELECT employee_name, department_name FROM employees LEFT JOIN departments USING (department_id) WHERE department_name IS NULL;

--RIGHT JOIN

--GET all departments, then employees if they exists
SELECT employee_name, department_name FROM employees RIGHT JOIN departments ON employees.department_id = departments.department_id;
-- OR
SELECT employee_name, department_name FROM employees RIGHT JOIN departments USING (department_id);

-- GET departments with no employees
SELECT employee_name, department_name FROM employees RIGHT JOIN departments USING (department_id) WHERE department_name IS NULL;
