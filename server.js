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
                  console.log('Please enter a dpearment name.');
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
        init();
    });
});
};

function addRole () {

}

function addEmployee () {

}

function updateEmployee () {

}



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

