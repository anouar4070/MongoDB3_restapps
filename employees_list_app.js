const mongoose = require('mongoose');
const Employees = require('./employee');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use a local MongoDB URI without authentication
const uri = "mongodb://127.0.0.1:27017/employeeDB";

mongoose.connect(uri,{'dbName':'employeeDB'});

// Middleware to enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET endpoint
app.get('/api/employees', async (req, res) => {
    const documents = await Employees.find();
    res.json(documents);
});

app.post('/api/add_employee', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const emp = new Employees({
      emp_name: data.name,
      age: data.age,
      location: data.location,
      email: data.email
    });
    await emp.save();
    res.json({ message: 'Employee added successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
