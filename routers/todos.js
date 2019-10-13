const router = require('express').Router();
const controller = require('../controllers/todos');

router
    .route('/')
    .get(controller.getTodos)
    .post(controller.postTodo);

module.exports = router;