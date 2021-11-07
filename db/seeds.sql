INSERT INTO departments (id, dept_name)
VALUES
('1', 'sales'),
('2', 'engineering'),
('3', 'finance'),
('4', 'legal');

INSERT INTO roles (id, job_title, salary, dept_id)
VALUES
('1', 'Sales Lead', '100000', '1'),
('2', 'Salesperson', '80000', '1'),
('3', 'Lead Engineer', '150000', '2'),
('4', 'Software Engineer', '120000', '2'),
('5', 'Accountant', '125000', '3'),
('6', 'Legal Team Lead', '250000', '4'),
('7', 'Lawyer', '190000', '4');

INSERT INTO employees (id, first_name, last_name, manager_id, roles_id)
VALUES
('1', 'John', 'Doe', '3', '1'),
('2', 'Mike', 'Chan', '1', '2'),
('3', 'Ashley', 'Rodriguez', NULL, '3'),
('4', 'Kevin', 'Tupik', '3', '4'),
('5', 'Jamie', 'Williams', '3', '4'),
('6', 'Malia', 'Brown', NULL, '6'),
('7', 'Sarah', 'Lourd', NULL, '7'),
('8', 'Tom', 'Allen', '7', '7'),
('9', 'Cooper', 'James', '3', '4'),
('10', 'Randy', 'Douglas', '3', '4');
