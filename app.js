const app = require('express')();
const todosRouter = require('./routers/todos');

app.use('/api/comments', todosRouter);

module.exports = app;