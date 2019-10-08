const assert = require('power-assert');
const Todo = require('../../../models/Todo');

describe('update todo', () => {
    it('引数にidプロパティ（１以上の数値）がないとエラーになる', () => {
        const invalidDataList = [
            {},
            {id: -1},
            {id: 0},
            {id: null},
            {id: {}},
            {id: []},
            {id: '1'}
        ];
        invalidDataList.forEach((data) => {
            try {
                Todo.update(data);
                assert.fail();
            } catch(error) {
                assert.strictEqual(error.message, 'idは必須です（1以上の数値)');
            }
        });
    });

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

    it('idに紐づくデータがないとエラーになる', () => {
        const notExistedId = 9999999;
        try {
            Todo.update({
                id: notExistedId,
                title: 'title',
                body: 'body'
            });
            assert.fail();
        } catch (error){
            assert.strictEqual(error.message, 'idに該当するtodoがありません');
        }
    });

    it('正しい引数を渡すとidに該当するTodoを更新して、更新したTodoを返す', () => {
        const data = {
            id: 1,
            title: '更新後のタイトル',
            body: '更新後のボディ'
        };
        const updatedTodo = Todo.update(data);
        assert.deepStrictEqual({...updatedTodo}, {
            id: updatedTodo.id,
            title: updatedTodo.title,
            body: updatedTodo.body,
            createdAt: updatedTodo.createdAt,
            updatedAt: updatedTodo.updatedAt
        });
        const currentTodos = Todo.findAll();
        assert.deepStrictEqual(currentTodos[0], updatedTodo);
        assert.deepStrictEqual(updatedTodo.updatedAt > updatedTodo.createdAt, true);
    });
});