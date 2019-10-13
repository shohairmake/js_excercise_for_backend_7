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
describe('test_PUT_/api/comments', () => {
    it('idが不正な場合はエラーになる', async () => {
        const putData = {
            title: 'title_test',
            body: 'body_test'
        };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${INVALID_ID}`,
            statusCode: 400
        }).send(putData);

        assert.deepStrictEqual(response.body, {
            message: 'idに該当するtodoがありません'
        });
    });

    it('idが正しくても、titleを送らなかったら400エラーが返る', async () => {
        const putData = { body: 'body_test' };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 400
        }).send(putData);
        assert.deepStrictEqual(response.body, {
            message: 'titleは必須です'
        });
    });

    it('idが正しくても、bodyを送らなかったら400エラーが返る', async () => {
        const putData = { title: 'title_test' };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 400
        }).send(putData);
        assert.deepStrictEqual(response.body, {
            message: 'bodyは必須です'
        });
    });

    it('idが正しくかつ、title, bodyを送ったら成功する', async () => {
        const oldTodos = await getTodos();
        const putData = {
            title: 'title_test',
            body: 'body_test'
        };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 200
        }).send(putData);

        const updatedTodo = response.body;
        assert.deepStrictEqual({ ...updatedTodo }, {
            id: VALID_ID,
            title: putData.title,
            body: putData.body,
            createdAt: updatedTodo.createdAt,
            updatedAt: updatedTodo.updatedAt
        });

        const currentTodos = await getTodos();
        assert.notDeepStrictEqual(
            oldTodos,
            currentTodos
        );
    });
});