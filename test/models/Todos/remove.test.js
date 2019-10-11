const assert = require('power-assert');
const Todo = require('../../../models/Todo');

describe('Todo.remove', () => {
    it('引数idが1以上の数値でなければエラーを返す', () => {
        const flag = [
            0,
            -1,
            null,
            [],
            {},
            '1'
        ];
        
        flag.forEach((data) => {
            try {
                Todo.remove(data);
                assert.fail();
            } catch (error) {
                assert.strictEqual(error.message, 'idは必須です（1以上の数値）');
            }
        });
    });

    it('idに紐づくデータがないとエラーになる', () => {
        const notExistedId = 999999;
        try {
            Todo.remove(notExistedId);
            assert.fail();
        } catch(error) {
            assert.strictEqual(error.message, 'idに該当するtodoが存在しません');
        }
    });

    it('正しいidを渡すと該当する既存idを削除して、削除したTodoを返す', () => {
        const oldTodos = Todo.findAll();
        const existedId = 3;
        const removeTodo = Todo.remove(existedId);

        assert.deepStrictEqual({...removeTodo}, {
            id: existedId,
            title: removeTodo.title,
            body: removeTodo.body,
            createdAt: removeTodo.createdAt,
            updatedAt: removeTodo.updatedAt
        });

        const currentTodos = Todo.findAll();
        assert.strictEqual(
            oldTodos.length,
            currentTodos.length + 1
        );
    });
});