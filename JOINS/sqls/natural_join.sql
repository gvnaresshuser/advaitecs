SELECT employee_name, project_name FROM employees NATURAL LEFT JOIN employee_project_assignment NATURAL LEFT JOIN projects;

--Long version without natural join
SELECT employee_name, project_name FROM employees 
LEFT JOIN employee_project_assignment USING (employee_id) LEFT JOIN projects USING (project_id);

--Even longer version
 SELECT employee_name, project_name FROM employees 
 LEFT JOIN employee_project_assignment ON employee_project_assignment.employee_id = employees.employee_id 
 LEFT JOIN projects ON projects.project_id = employee_project_assignment.project_id;
