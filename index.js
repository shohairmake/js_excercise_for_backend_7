const app = require('express')();
const todosRouter = require('./routers/todos');
const PORT = 8080;

app.use('/api/comments', todosRouter);

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});