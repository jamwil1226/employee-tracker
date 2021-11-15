
INSERT INTO departments (dept_name)
VALUES
('sales'),
('engineering'),
('finance'),
('legal');

INSERT INTO roles (job_title, salary, dept_id)
VALUES
('Sales Lead', '100000', '1'),
('Salesperson', '80000', '1'),
('Lead Engineer', '150000', '2'),
('Software Engineer', '120000', '2'),
('Accountant', '125000', '3'),
('Legal Team Lead', '250000', '4'),
('Lawyer', '190000', '4');

INSERT INTO employees (first_name, last_name, manager_id, roles_id, dept_id)
VALUES
('John', 'Doe', '3', '1', '1'),
('Mike', 'Chan', '1', '2', '2'),
('Ashley', 'Rodriguez', NULL, '3', '2'),
('Kevin', 'Tupik', '3', '4', '2'),
('Jamie', 'Williams', '3', '4', '2'),
('Malia', 'Brown', NULL, '6', '4'),
('Sarah', 'Lourd', NULL, '5', '3'),
('Tom', 'Allen', '7', '7', '4'),
('Cooper', 'James', '3', '4', '2'),
('Randy', 'Douglas', '3', '4', '2');
