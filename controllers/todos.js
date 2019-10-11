const Todo = require('../models/Todo');

module.exports = {
    getTodos: (req, res) => {
        const storeTodos = Todo.findAll();

        res.status(200).json(storeTodos);
    }
};