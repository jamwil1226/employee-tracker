const db = require('./db/connection');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

// TESTING INQUIRER
const questions = [
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role']
      },
    ];

//Function to initialize the employee tracker 
const init = async () => {
    try {
        inquirer.prompt(questions) 
        .then (answers => {
            switch(answers.start) {
                case 'View all departments':
                    viewDepts();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;                
            }
        });
        
    } catch (err) {
        console.log(err);
    }
};

function viewDepts() {
    const sql = `SELECT * FROM departments`;
    
    db.query(sql, (err, rows) => {
        if (err) {
        console.log(err)
        return;
        }
        console.table(rows);
        init();
    });
};

function viewRoles() {
    const sql = `SELECT roles.*, departments.dept_name
    AS department
    FROM roles
    LEFT JOIN departments
    ON roles.dept_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
        console.log(err)
        return;
        }
        console.table(rows);
        init();
    });
};

function viewEmployees() {
    const sql = `SELECT employees.id, employees.first_name, 
    employees.last_name, roles.job_title, departments.dept_name 
    AS department, roles.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.roles_id = roles.id
    LEFT JOIN departments ON roles.dept_id = departments.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id`;
    db.query(sql, (err, rows) => {
        if (err) {
        console.log(err)
        return;
        }
        console.table(rows);
        init();
    });
};

function addDepartment () {
    inquirer.prompt([
        {
          type: 'input',
          name: 'addDept',
          message: "Enter the department that you would like to add.",
          validate: addDept => {
              if (addDept) {
                  return true;
              } else {
                  console.log('Please enter a department name.');
                  return false;
              }
          }
        }
    ])
    .then(answer => {
    const sql = `INSERT INTO departments (dept_name) VALUES (?)`;
    db.query(sql, answer.addDept, (err, rows) => {
        if (err) {
        console.log(err)
        return;
        }
        console.log(answer.addDept + ' has been added to departments.')
        viewDepts();
    });
});
};

function addRole () {
    inquirer.prompt([
        {
          type: 'input',
          name: 'addAnotherRole',
          message: "Enter the role that you would like to add.",
          validate: addAnotherRole => {
              if (addAnotherRole) {
                  return true;
              } else {
                  console.log('Please enter a role name.');
                  return false;
              }
          }
        },
        {
            type: 'input',
            name: 'addSalarytoRole',
            message: "Enter the salary for the role.",
            validate: addSalarytoRole => {
                if (addSalarytoRole) {
                    return true;
                } else {
                    console.log('Please enter a salary.');
                    return false;
                }
            }
        },
        {
        type: 'input',
        name: 'addDepttoRole',
        message: "Enter the department ID for the role.",
        validate: addDepttoRole => {
            if (addDepttoRole) {
                return true;
            } else {
                console.log('Please enter a department ID.');
                return false;
            }
        }
    }
    ])
    .then(answer => {
        const sql = `INSERT INTO roles (job_title, salary, dept_id) VALUES (?,?,?)`;
        const params = [answer.addAnotherRole, answer.addSalarytoRole, answer.addDepttoRole];
        db.query(sql, params, (err, rows) => {
            if (err) {
            console.log(err)
            return;
            }
        console.log(answer.addAnotherRole + ' has been added to roles.')
        viewRoles();
    });
}
)};

function addEmployee () {
    inquirer.prompt([
        {
          type: 'input',
          name: 'addEmployeeFirst',
          message: "Enter the first name of the employee you'd like to add.",
          validate: addEmployeeFirst => {
              if (addEmployeeFirst) {
                  return true;
              } else {
                  console.log('Please enter the employees first name.');
                  return false;
              }
          }
        },
        {
            type: 'input',
            name: 'addEmployeeLast',
            message: "Enter last name of the employee you'd like to add.",
            validate: addEmployeeLast => {
                if (addEmployeeLast) {
                    return true;
                } else {
                    console.log('Please enter the employees last name.');
                    return false;
                }
            }
        },
        {
        type: 'input',
        name: 'addEmployeeSalary',
        message: "Enter the role ID of the employee you'd like to add to set the salary.",
        validate: addEmployeeSalary => {
            if (addEmployeeSalary) {
                return true;
            } else {
                console.log('Please enter the employees role ID to set the salary.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployeeMgr',
        message: "Enter the Manager's ID of the employee you'd like to add.",
        validate: addEmployeeMgr => {
            if (addEmployeeMgr) {
                return true;
            } else {
                console.log('Please enter the employees Managers ID.');
                return false;
            }
        }
    }
    ])
    .then(answer => {
        const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
        const params = [answer.addEmployeeFirst, answer.addEmployeeLast, answer.addEmployeeSalary, answer.addEmployeeMgr];
        db.query(sql, params, (err, rows) => 
            {if (err) {
            console.log(err)
            return;
            }
        console.log(answer.addEmployeeFirst + ' ' + answer.addEmployeeLast + ' has been added to employees.')
        viewEmployees();
    });
}
)};

function updateEmployee () {
    inquirer.prompt([
        {
          type: 'input',
          name: 'updateEmployeeFirst',
          message: "Enter the first name of the employee you'd like to update.",
          validate: updateEmployeeFirst => {
              if (updateEmployeeFirst) {
                  return true;
              } else {
                  console.log('Please enter the employees first name.');
                  return false;
              }
          }
        },
        {
            type: 'input',
            name: 'updateEmployeeLast',
            message: "Enter last name of the employee you'd like to update to.",
            validate: updateEmployeeLast => {
                if (updateEmployeeLast) {
                    return true;
                } else {
                    console.log('Please enter the employees last name.');
                    return false;
                }
            }
        },
        {
        type: 'input',
        name: 'updateEmployeeRole',
        message: "Enter the ID of the role for the employee you'd like to update to.",
        validate: updateEmployeeRole => {
            if (updateEmployeeRole) {
                return true;
            } else {
                console.log('Please enter the employees role/job title.');
                return false;
            }
        }
    }
    ])
    .then(answer => {
        const sql = `UPDATE employees SET roles_id = ? WHERE first_name = ?`;
        const params = [answer.updateEmployeeRole, answer.updateEmployeeFirst];
            db.query(sql, params, (err, rows) => {
                if (err) {
                console.log(err)
                return;
                }
                console.log('The role for ' + answer.updateEmployeeFirst + ' ' + answer.updateEmployeeLast + ' has been updated.')
                viewEmployees();
        
            });
}
)};


//Function call to initialize the employee tracker
init();


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
   
    app.listen(PORT, () => {
      
    });
  });

