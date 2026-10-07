-- GET employees with their respective departments, without considering those with no department.
SELECT employee_name, department_name FROM employees INNER JOIN departments ON employees.department_id = departments.department_id;
-- OR
SELECT employee_name, department_name FROM employees INNER JOIN departments USING (department_id);