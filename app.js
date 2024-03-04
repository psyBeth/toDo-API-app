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

app.all('/', (req, res) => {  // Allow all methods. all --> URL=/  -  use --> URL=/*
    res.send('WELCOME TO TODO API')
})
/* ------------------------------------------------------- */

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
// sequelize.sync();  //CREATE TABLE
// sequelize.sync({ force: true })  // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true });   // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP

// connect to database:
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))
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