const filterRestaurants = require('../../util/filterRestaurants');
const mockData = require('../../api/mockData/mockData.json');

describe('the filterRestaurants function', () => {
	let restaurants;

	beforeAll(() => {
		restaurants = filterRestaurants(mockData.businesses);
	});

	test('it should return 10 items', () => {
		expect(restaurants).toHaveLength(10);
	});

	test('it should sort the restaurants on distance', () => {
		expect(restaurants[0].distance).toBeLessThan(restaurants[1].distance);
		expect(restaurants[0].distance).toBeLessThan(restaurants[2].distance);
		expect(restaurants[0].distance).toBeLessThan(restaurants[3].distance);
	});

	test('it should return only restaurants that are open', () => {
		const closedRestaurants = restaurants.find(
			(restaurant) => restaurant.is_closed
		);
		expect(closedRestaurants).toBe(undefined);
	});
});
