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

describe('test_POST_/api/comments', () => {
    it('titleを送らなかったら400エラーが返る', async () => {
        const postData = { body: 'body_test' };

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: 400
        }).send(postData);
        assert.deepStrictEqual(response.body, {
            message: 'titleは必須です'
        });
    });

    it('bodyを送らなかったら400エラーが返る', async () => {
        const postData = { title: 'title_test' };

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: 400
        }).send(postData);
        assert.deepStrictEqual(response.body, {
            message: 'bodyは必須です'
        });
    });

    it('title, bodyを送ったら成功する', async () => {
        const oldTodos = await getTodos();
        const postData = {
            title: 'title_test',
            body: 'body_test'
        };

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: 200
        }).send(postData);
        const createdTodo = response.body;
        assert.deepStrictEqual({ ...createdTodo }, {
            id: createdTodo.id,
            title: postData.title,
            body: postData.body,
            createdAt: createdTodo.createdAt,
            updatedAt: createdTodo.updatedAt
        });
        const currentTodos = await getTodos();
        assert.strictEqual(
            oldTodos.length + 1, currentTodos.length
        );
    });
});