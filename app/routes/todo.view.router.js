"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ROUTERS:

const todo = require('../controllers/todo.view.controller');

const router = require('express').Router()

router.get('/', todo.list);

router.get('/create', todo.create);


module.exports = router