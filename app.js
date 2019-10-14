const express = require('express');
const app = express();
const todosRouter = require('./routers/todos');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/comments', todosRouter);

module.exports = app;