const router = require('express').Router();
const controller = require('../controllers/todos');

router
    .route('/')
    .get(controller.getTodos);

module.exports = router;