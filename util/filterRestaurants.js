const filterRestaurants = (restaurants) =>
	restaurants
		.filter((restaurant) => !restaurant.is_closed)
		.sort((a, b) => (a.distance > b.distance ? 1 : -1))
		.slice(0, 10);
module.exports = filterRestaurants;
