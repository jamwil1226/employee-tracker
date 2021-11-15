const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.dept_name
    AS department
    FROM roles
    LEFT JOIN departments
    ON roles.dept_id = departments.id`;
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

router.get('/roles/:id', (req, res) => {
    const sql = `SELECT roles.*, departments.dept_name
    AS department
    FROM roles
    LEFT JOIN departments
    ON roles.dept_id = departments.id
    WHERE id = ?`;
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

router.delete('/roles/:id', (req, res) => {
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

module.exports = router;