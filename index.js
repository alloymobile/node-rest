
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employee.db");


app.get('/', (req, res) => {
    db.all("SELECT rowid AS id, * FROM Employees",
    function(err,results) { res.send(results); });
});

app.get('/:id', (req, res) => {
    db.all("SELECT rowid AS id, * FROM Employees where rowid = ?", [req.params.id],
    function(err,results) { res.send(results); });
});

app.post('/', (req, res) => {
    console.log(req.body);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const salary = req.body.salary;
    db.run("INSERT INTO Employees VALUES (?,?,?)", [firstname,lastname,salary]);
    db.all("SELECT rowid AS id, * FROM Employees",
    function(err,results) { res.send(results); });
});

app.put('/:id', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const salary = req.body.salary;
    db.run("UPDATE Employees SET firstname=?,lastname=?,salary=? WHERE rowid=?",
    [firstname,lastname,salary,req.params.id],
    function(err) {console.log(err) });
    db.all("SELECT rowid AS id, * FROM Employees where rowid = ?", [req.params.id],
    function(err,results) { res.send(results); });
});

app.delete('/:id', (req, res) => {
  // delete an employee based on the id
  db.run("DELETE FROM Employees WHERE rowid=?", [req.params.id],
         function(err) {console.log(err) });
});

app.listen(3000, () => {  
    // db.serailize will cause any db commands to run in sequence
db.serialize(function() {

    db.run("DROP TABLE IF EXISTS Employees");
    db.run("CREATE TABLE Employees (firstname TEXT, lastname TEXT, salary REAL)");
  
    // insert records into the employee table
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Kevin','Browne','50000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Mary','Yendt','65000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Michael','Jordan','60000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Sharon','Fuller','85000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Wayne','Gretzky','70000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Ajit','Singh','43000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Tiger','Woods','90000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Happy','Gilmour','32000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Jane','Doe','65000']);
    db.run("INSERT INTO Employees VALUES (?,?,?)", ['Bob','Mills','93000']);

      // select all employees again to see results after changes
    db.all("SELECT rowid AS id, * FROM Employees",
    function(err,results) { console.log(results); });
  });
    console.log('Example app listening on port 3000!');
});