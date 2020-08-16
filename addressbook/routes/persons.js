// persons.js

var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/allUsers", function(req, res) {
    
    db.Person.findAll()
        .then( persons => {
            res.status(200).send(JSON.stringify(persons));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});


router.get("/:id", function(req, res) {
    db.Person.findByPk(req.params.id)
        .then( person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/addUser", function(req, res) {
    var newUser = req.body;
    console.log(newUser.firstName);
    console.log(newUser.lastName);
    console.log(newUser.id);
    db.Person.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        id: newUser.id
        })
        .then( person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err + JSON.stringify(newUser)));
        });
});

router.delete("/:id", function(req, res) {
    db.Person.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;