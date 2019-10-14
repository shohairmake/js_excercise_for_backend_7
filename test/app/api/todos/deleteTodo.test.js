const assert = require('power-assert');
const requestHelper = require('../../../helper/requestHelper');

const getTodos = async () => {
    const response = await requestHelper.request({
        method: 'get',
        endPoint: '/api/comments',
        statusCode: 200
    });
    return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 9999999;
describe('test_DELETE_/api/comments', () => {
    it('idが不正な場合はエラーになる', async () => {
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/${INVALID_ID}`,
            statusCode: 404
        });

        assert.deepStrictEqual(response.body, {
            message: 'idに該当するtodoがありません'
        });
    });

    it('idが正しかったら成功する', async () => {
        const oldTodos = await getTodos();

        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 200
        });

        const deletedTodo = response.body;
        assert.deepStrictEqual({ ...deletedTodo }, {
            id: VALID_ID,
            title: deletedTodo.title,
            body: deletedTodo.body,
            createdAt: deletedTodo.createdAt,
            updatedAt: deletedTodo.updatedAt
        });

        const currentTodos = await getTodos();
        assert.strictEqual(
            oldTodos.length,
            currentTodos.length + 1
        );

        assert.deepStrictEqual(
            deletedTodo,
            oldTodos[0]
        );

        assert.notDeepStrictEqual(
            deletedTodo,
            currentTodos[0]
        );
    });
});