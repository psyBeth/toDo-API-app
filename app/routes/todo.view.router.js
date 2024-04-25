"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ROUTERS:

const todo = require('../controllers/todo.view.controller');

const router = require('express').Router();

// router.get('/', todo.list);
router.all('/', todo.list);

// router.get('/create', todo.create);   // form view
// router.post('/create', todo.create);    // form send
router.all('create', todo.create);

router.all('/:id', todo.read);

router.all('/:id/update', todo.update);

router.all('/:id/delete', todo.delete);

module.exports = router;