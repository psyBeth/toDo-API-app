"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json())

// Catch async errors:
require('express-async-errors')

// app.all('/', (req, res) => {  // Allow all methods. all --> URL=/  -  use --> URL=/*
//     res.send('WELCOME TO TODO API')
// })
/* ------------------------------------------------------- */
//* MODELS:
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:./db.sqlite3')

// define method creates the sequelize model:
// each model corresponds to a table in the database.
// sequelize.define('tableName',{modelDetails})

const Todo = sequelize.define('todos', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, //default: tue
    //     unique: true, //default: false
    //     comment: 'description',
    //     primaryKey: true, //default: false
    //     autoIncrement: true,
    //     field: 'custom_name',
    //     defaultValue: 'default', //default: null
    // } 

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    description: DataTypes.TEXT, //shorthand using 

    priority: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: 0,
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
    }

    //? no need to define createdAt & updatedAt fields.
    //? Sequelize automatically creates and manages.
});
// Syncronization:
// apply the model info to the database
// sequelize.sync();  //CREATE TABLE  //no existing table
// sequelize.sync({ force: true })  // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true });   // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP // there is an existing table that will be updated

// connect to database:
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))
/* ------------------------------------------------------- */
//* ROUTERS:
const router = express.Router()

//* LIST TODOS:
router.get('/', async (req, res) => {
    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()

    res.status(200).send({
        error:false,
        result: data
    })
})

//? CRUD Processes:


//* CREATE TODO:
router.post('/', async (req, res) => {

    const receivedData = req.body

    const data = await Todo.create({
        title: receivedData.title,
        description: receivedData.description,
        priority: receivedData.priority,
        isDone: receivedData.isDone,
        newKey: 'newvalue',
    })
    
    res.status(200).send({
        error: false,
        result: data.dataValues,
    })
});

//* READ TODO
router.get('/:id', async (req, res) =>{
    // const data = await Todo.findOne({where: {id: req.params.id}})
    const data = await Todo.findByPk(req.params.id)
    res.status(200).send({
        error: false,
        result: data,
    })
})



/* ------------------------------------------------------- */

//* UPDATE TODO:
router.put('/:id', async (req, res) => {
    // const data = await Todo.update({...new data}, {where:...})
    const data = await Todo.update(req.body, { where: {id: req.params.id}})
    res.status(202).send({
        error: false,
        message: "updated",
        body: req.body,
        result: data,  // quantity of updated feature
        new: await Todo.findByPk(req.params.id)  //to see the updated data
    })
    
})

app.use(router)
/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));