const axios = require('axios');
const { baseUrl, apiKey } = require('../../api/apiConfig.json');
const { latitude, longitude } = require('../epicenterCoords.json');

const options = { headers: { Authorization: `Bearer ${apiKey}` } };

const setupUrl = (category) => {
	const query = `term=restaurants&categories=${category}&latitude=${latitude}&longitude=${longitude}&sort_by=distance`;
	return baseUrl + query;
};

describe('Test different category requests to Yelp Api', () => {
	test('pizza should respond with pizza restaurants', async () => {
		const searchCategory = 'pizza';
		const url = setupUrl(searchCategory);
		const {
			status,
			data: { businesses },
		} = await axios.get(url, options);
		expect(status).toBe(200);
		const foundCategory = businesses[0].categories.find(
			(category) => category.alias === searchCategory
		);
		expect(foundCategory.alias).toBe(searchCategory);
	});

	test('sushi should respond with sushi restaurants', async () => {
		const searchCategory = 'sushi';
		const url = setupUrl(searchCategory);
		const {
			status,
			data: { businesses },
		} = await axios.get(url, options);
		expect(status).toBe(200);
		const foundCategory = businesses[0].categories.find(
			(category) => category.alias === searchCategory
		);
		expect(foundCategory.alias).toBe(searchCategory);
	});

	test('scandinavian should respond with scandinavian restaurants', async () => {
		const searchCategory = 'pizza';
		const url = setupUrl(searchCategory);
		const {
			status,
			data: { businesses },
		} = await axios.get(url, options);
		expect(status).toBe(200);
		const foundCategory = businesses[0].categories.find(
			(category) => category.alias === searchCategory
		);
		expect(foundCategory.alias).toBe(searchCategory);
	});

	test('"all" should respond with 200 OK', async () => {
		const url = setupUrl('all');
		const { status } = await axios.get(url, options);
		expect(status).toBe(200);
	});

	test('a bad category should respond with a 400 Bad Request', async () => {
		const url = setupUrl('qwerty');
		try {
			await axios.get(url, options);
		} catch (error) {
			expect(error.response.status).toBe(400);
			expect(error.response.statusText).toBe('Bad Request');
		}
	});
});
