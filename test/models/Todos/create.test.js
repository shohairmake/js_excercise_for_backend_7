const assert = require('power-assert');
const Todo = require('../../../models/Todo');

describe('create Todo test', () => {
    it('引数にtitleプロパティがないとエラーになる', () => {
        const dataList = [
            {},
            {body: '詳細文'}
        ];
        dataList.forEach(data => {
            try {
                Todo.create(data);
                assert.fail();
            } catch (error) {
                assert.strictEqual(error.message, 'titleは必須です');
            }
        });
    });
    
    it('引数にbodyプロパティがないとエラーになる', () => {
        try {
            Todo.create({title: 'タイトル'});
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'bodyは必須です');
        }
    });

    it('正しい引数を渡すと新規にTodoデータを作成して、作成したTodoを返す', () => {
        const oldTodos = Todo.findAll();
        const data = {
            title: 'dummy title',
            body: 'dummy body'
        };

        const createdTodo = Todo.create(data);
        assert.deepStrictEqual({...createdTodo}, {
            id: createdTodo.id,
            title: data.title,
            body: data.body,
            createdAt: createdTodo.createdAt,
            updatedAt: createdTodo.updatedAt
        });

        const currentTodos = Todo.findAll();
        assert.strictEqual(oldTodos.length + 1, currentTodos.length);
    });
});