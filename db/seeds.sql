INSERT INTO department (id, dept_name)
VALUES
('1', 'sales'),
('2', 'engineering'),
('3', 'finance'),
('4', 'legal');

INSERT INTO role (id, job_title, salary, dept_id)
VALUES
('1', 'Sales Lead', '100000', '1'),
('2', 'Salesperson', '80000', '1'),
('3', 'Lead Engineer', '150000', '2'),
('4', 'Software Engineer', '120000', '2'),
('5', 'Accountant', '125000', '3'),
('6', 'Legal Team Lead', '250000', '4'),
('7', 'Lawyer', '190000', '4');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
('1', 'John', 'Doe', '1', '3'),
('2', 'Mike', 'Chan', '2', '1'),
('3', 'Ashley', 'Rodriguez', '3', NULL),
('4', 'Kevin', 'Tupik', '4', '3'),
('5', 'Jamie', 'Williams', '4', '3'),
('6', 'Malia', 'Brown', '6', NULL),
('7', 'Sarah', 'Lourd', '7', NULL),
('8', 'Tom', 'Allen', '7', '7'),
('9', 'Cooper', 'James', '4', '3'),
('10', 'Randy', 'Douglas', '4', '3');
