const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(

    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'abcdef',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
  );

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT employees.*, roles.salary 
    AS salary
    FROM employees 
    LEFT JOIN roles 
    ON employees.roles_id = roles.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
  // Get a single employee
  app.get('/api/employee/:id', (req, res) => {
    const sql = `SELECT employees.*, roles.salary 
    AS salary
    FROM employees 
    LEFT JOIN roles 
    ON employees.roles_id = roles.id
    WHERE employees.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  
  // Delete an employee
  app.delete('/api/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
  
// Create an employee
app.post('/api/employees', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'id',
      'first_name',
      'last_name',
      'role_id',
      'manager_id'
    );

    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
      VALUES (?,?,?,?,?)`;
    const params = [body.id, body.first_name, body.last_name, body.role_id, body.manager_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });

  // Update a employee's role
app.put('/api/employee/:id', (req, res) => {
    const sql = `UPDATE employees SET roles_id = ? 
                 WHERE id = ?`;

    const errors = inputCheck(req.body, 'roles_id');

    if (errors) {
    res.status(400).json({ error: errors });
    return;
    }
    const params = [req.body.roles_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  app.get('/api/roles/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
});

app.delete('/api/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });