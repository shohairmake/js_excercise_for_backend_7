const router = require('express').Router();
const controller = require('../controllers/todos');

router
    .route('/')
    .get(controller.getTodos)
    .post(controller.postTodo);

router
    .route('/:id')
    .put(controller.putTodo);

module.exports = router;