const request = require('supertest');
const assert = require('power-assert');
const app = require('../../../../app');

describe('test_GET_/api/comments', () => {
    it('return comments in response.body', async () => {
        const response = await request(app)
            .get('/api/comments')
            .set('Accept', 'application/json')
            .expect('Content-Type', /application\/json/)
            .expect(200);

        const todos = response.body;
        assert.strictEqual(Array.isArray(todos), true);
        todos.forEach(todo => {
            assert.strictEqual(typeof todo.id, 'number');
            assert.strictEqual(typeof todo.title, 'string');
            assert.strictEqual(typeof todo.body, 'string');
            assert.strictEqual(typeof todo.createdAt, 'string');
            assert.strictEqual(typeof todo.updatedAt, 'string');
        });
    });
});