const request = require('supertest');
const app = require('../../app');
const { epiLat, epiLong } = require('../epicenterCoords.json');
const mockData = require('../../api/mockData/mockData.json');

const category = 'all';

describe('Test the server routes', () => {
	test('Faulty route should respond with a 404', async () => {
		const response = await request(app).get(
			`/restaurantss/${epiLat}/${epiLong}/${category}`
		);
		expect(response.statusCode).toBe(404);
	});
});

describe('Test the server routes', () => {
	let response;
	beforeAll(async () => {
		response = await request(app).get(
			`/restaurants/${epiLat}/${epiLong}/${category}`
		);
	});

	test('The restaurants route should respond with a 200 OK', async () => {
		expect(response.statusCode).toBe(200);
	});

	test('The restaurants route should respond with mockdata', async () => {
		expect(JSON.parse(response.text)[0]).toMatchObject(mockData.businesses[0]);
	});
});
