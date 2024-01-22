const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const path = require("path");
const dbPath = path.join(__dirname, "employee.db");

let db = null
const initializeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(3004, () => {
            console.log("Server running at http://localhost:3004");
        });
    } catch (e) {
        console.log(`DB Error:${e.message}`);
        process.exit(1);
    }
};
initializeDbAndServer();

app.get('/',async(req,res)=>{
    const getData = "select * from employee";
    const getTweets = await db.all(getData);
    res.send(getTweets);
});

app.post("/add", async (req, res) => {
    try{
    const details = req.body;
    const {id,name,email,destination,salary} = details;
    const data = `
    INSERT INTO employee (empId,empName,email,destination,salary)
    VALUES(${id},"${name}","${email}","${destination}",${salary});`;
    await db.run(data);
    res.json('employee add');
    }catch(err){
        res.json(err)
    }
});

app.put("/update/:id/", async (req, res) => {
    try{
    const id = req.params.id;
    const details = req.body;
    const {name,email,destination,salary} = details;
    const updateData = `
    UPDATE 
    employee 
    SET 
        empName = '${name}',
        email='${email}',
        destination='${destination}',
        salary=${salary}
    WHERE empId=${id};`;
    await db.run(updateData);
    res.json('employee update')
    }catch(err){
        res.json(err)
    }

});

app.delete("/delete/:id/", async (req, res) => {
    const id = req.params.id;
    const deleteData = `
    DELETE FROM employee
    WHERE empId=${id};`;
    await db.run(deleteData);
    res.send("Employee Removed");
});
