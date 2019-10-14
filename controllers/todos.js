const Todo = require('../models/Todo');

const toggle_in_error_detail = (error, res) => {
    if (error.message === 'idに該当するtodoがありません') {
        res.status(404).json({ message: error.message });
    } else {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTodos: (req, res) => {
        const storeTodos = Todo.findAll();

        res.status(200).json(storeTodos);
    },

    postTodo: (req, res) => {
        try {
            const { title, body } = req.body;
            const createdTodo = Todo.create({ title, body });

            res.status(200).json(createdTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    putTodo: (req, res) => {
        const id = req.params.id;
        const { title, body } = req.body;
        const parsedId = parseInt(id, 10);

        try {
            const updatedTodo = Todo.update({
                id: parsedId,
                title,
                body
            });
            res.status(200).json(updatedTodo);
        } catch (error) {
            toggle_in_error_detail(error, res);
        }
    },

    delete: (req, res) => {
        const id = req.params.id;
        const parsedId = parseInt(id, 10);

        try {
            const removedTodo = Todo.remove(parsedId);
            res.status(200).json(removedTodo);
        } catch (error) {
            toggle_in_error_detail(error, res);
        }
    }
};