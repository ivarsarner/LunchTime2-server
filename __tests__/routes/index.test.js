const request = require('supertest');
const app = require('../../app');

describe('Test the server routes', () => {
	test('The index route should respond with a 200 OK', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
	});
});
