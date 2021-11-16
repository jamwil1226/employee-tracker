// Cannot figure out how to get this to display the table correctly! What do I call to do this?

function viewByMgr () {
    inquirer.prompt([
        {
          type: 'input',
          name: 'viewByManager',
          message: "Enter the ID of the manager that you would like to view the employees of.",
          validate: viewByManager => {

              if (viewByManager) {
                  return true;
              } else {
                  console.log('Please enter the Managers ID.');
                  return false;
              }
          }
        }
    ])
    .then(answer => {
        const sql = `SELECT first_name, last_name FROM employees WHERE manager_id = ?`;
        const params = [answer.viewByManager];
        db.query(sql, params, (err, rows) => 
            {if (err) {
            console.log(err)
            return;
            }
        console.log('Now showing the employees of manager ID ' + answer.viewByManager);
        // What needs to be called here to display the table of employees by Manager????
    });
}
)};