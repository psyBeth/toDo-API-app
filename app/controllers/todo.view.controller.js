"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// CONTROLLERS:

const Todo = require('../models/todo.model');

const PRIORITY = {
    '-1': 'Low',
    '0': 'Norm',
    '1': 'High'
}

module.exports = {

    list: async (req, res) => {

        // const data = await Todo.findAll()
        const data = await Todo.findAndCountAll({
            order: [
                ['id', 'desc']
            ]
        });
        // console.log(data);

        // res.status(200).send({
        //     error: false,
        //     result: data
        // })

        res.render('todoList', { todos: data.rows, count: data.count, priority: PRIORITY });
    },

    // CRUD:

    create: async (req, res) => {

        // const receivedData = req.body

        // const data = await Todo.create({
        //     title: receivedData.title,
        //     description: receivedData.description,
        //     priority: receivedData.priority,
        //     isDone: receivedData.isDone,
        //     // newKey: 'newValue' // Modelde tanımlanmadığı için bir işe yaramayacaktır.
        // })

        // const data = await Todo.create(req.body)

        // res.status(201).send({
        //     error: false,
        //     result: data.dataValues
        // })

        if(req.method == 'POST') {
            // create
            const data = await Todo.create(req.body);

            //! no needed bcs errorHandler is working
            // if(data){
            //     res.redirect('/view');  // return home
            // } else {
            //     res.redirect('/view/create');   // create form
            // }

            res.redirect('/view'); 

        } else {
            // view
            res.render('todoCreate', {priority: PRIORITY});
        };

    },

    read: async (req, res) => {

        // const data = await Todo.findOne({ where: { id: req.params.id } })
        const data = await Todo.findByPk(req.params.id)

        // res.status(200).send({
        //     error: false,
        //     result: data
        // })
        // console.log(data.dataValues);

        res.render('todoRead', { todo: data.dataValues, priority: PRIORITY })

    },

    update: async (req, res) => {

        // const data = await Todo.update({ ...newData }, { ...where })
        // const data = await Todo.update(req.body, { where: { id: req.params.id } })

        // res.status(202).send({
        //     error: false,
        //     message: 'Updated',
        //     body: req.body, // Gönderdiğim veriyi göster.
        //     result: data,
        //     new: await Todo.findByPk(req.params.id) // Güncellenmiş veriyi de göster.
        // })


        if(req.method == 'POST') {
            // UPDATE:
            // const data = await Todo.update(req.body, { where: { id: req.params.id } });

            res.redirect('/view'); 

        } else {
            // view
            const data = await Todo.findByPk(req.params.id);

            res.render('todoUpdate', { todo: data.dataValues, priority: PRIORITY });
        };
    },

    delete: async (req, res) => {

        // const data = await Todo.destroy({ ...where })
        const data = await Todo.destroy({ where: { id: req.params.id } })
        // console.log(data)

        // //? 204 No Content -> Ekrana çıktı vermeyebilir.
        // res.status(204).send({
        //     error: false,
        //     message: 'Deleted',
        //     result: data
        // })

        if (data > 0) { 

            res.redirect('/view');

        } else { 
            res.errorStatusCode = 404
            throw new Error('Not Found.')
        }
    }
}