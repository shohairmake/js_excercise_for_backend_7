const assert = require('power-assert');
const Todo = require('../../../models/Todo');

describe('Todo.findAll', () => {
    it('配列の決められたデータ構造でTodoが格納されている', () => {
        const todos = Todo.findAll();
        assert.strictEqual(Array.isArray(todos), true);
        assert.strictEqual(todos.length > 0, true);
        todos.forEach(todo => {
            assert.deepStrictEqual({...todo}, {
                id: todo.id,
                title: todo.title,
                body: todo.body,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt,
            });
        });
    });
});