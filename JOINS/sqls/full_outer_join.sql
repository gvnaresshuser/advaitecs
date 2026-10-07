SELECT employee_name, department_name FROM employees FULL OUTER JOIN departments ON employees.department_id = departments.department_id;
-- OR
SELECT employee_name, department_name FROM employees FULL OUTER JOIN departments USING (department_id);

-- GET employees with no department and department with no employees
SELECT employee_name, department_name FROM employees FULL OUTER JOIN departments USING (department_id) WHERE department_name IS NULL;
