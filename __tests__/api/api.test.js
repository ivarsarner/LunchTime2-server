const getYelp = require('../../api/api');
const { latitude, longitude } = require('../epicenterCoords.json');

describe('Test the getYelp function', () => {
	let response;
	beforeAll(async () => {
		const params = { category: 'all', latitude, longitude };
		response = await getYelp(params);
	});

	test('It should respond with a 200 OK', async () => {
		expect(response.status).toBe(200);
	});

	test('It should respond with an object with a property of "businesses"', async () => {
		expect(response.data).toHaveProperty('businesses');
	});

	test('The "businesses" key should have an array of 20 items', async () => {
		expect(response.data.businesses).toHaveLength(20);
	});
});

describe('Test the getYelp function with a different category', () => {
	test('pizza should respond with pizza restaurants', async () => {
		const params = { category: 'pizza', latitude, longitude };
		const {
			status,
			data: { businesses },
		} = await getYelp(params);
		expect(status).toBe(200);
		const foundCategory = businesses[0].categories.find(
			(category) => category.alias === params.category
		);
		expect(foundCategory.alias).toBe(params.category);
	});
});
