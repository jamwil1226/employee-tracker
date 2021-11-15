// to run employee list with department, salary, manager names
SELECT employees.id, 
                      employees.first_name, 
                      employees.last_name, 
                      roles.job_title, 
                      departments.dept_name AS department,
                      roles.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employees
                      LEFT JOIN roles ON employees.roles_id = roles.id
                      LEFT JOIN departments ON roles.dept_id = departments.id
                      LEFT JOIN employees manager ON employees.manager_id = manager.id