SELECT e1.department_id, e1.employee_name employee, e2.employee_name colleague 
FROM employees e1 LEFT JOIN employees e2 
ON e1.department_id = e2.department_id AND e1.employee_id != e2.employee_id;