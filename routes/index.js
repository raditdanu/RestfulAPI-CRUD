const express = require('express')
const res = require('express/lib/response')
const router = express.Router()


const { Employee } = require('../models/employee')


// Get All Employee
router.get('/api/employees', (req,res) => {
    Employee.find({}, (err, data) => {
        if(!err) {
            res.send(data)
        } else {
            console.log(err);
        }
    })
})

// Save Employee
router.post('/api/employee/add', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    });
    emp.save((err, data) => {
        res.status(200).json({ code:200, message: 'Employee Added Successfully',
        addEmployee:data })
    })
})

// Get Single Employee
router.get('/api/employee/:id', (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data)
        } else {
            console.log(err);
        }
    })
})


// Update Employee

router.put('/api/employee/edit/:id', (req, res) => {
    const emp = {
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, { $set:emp }, { new:true }, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: 'Employee Update Successfully',
            updateEmployee: data })
        } else {
            console.log(err);
        }
    })
})



// Delete Employee

router.delete('/api/employee/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: 'Employee Successfully Removed',
        deleteEmployee: data })
        } else {
            console.log(err);
        }
    })
})

module.exports = router