const express = require('express');
const router = express.Router();
const getYelp = require('../api/api.js');
const mockData = require('../api/mockData/mockData.json');
const filterRestaurants = require('../util/filterRestaurants');

router.get('/:latitude/:longitude/:category', async (req, res) => {
	const params = ({ latitude, longitude, category } = req.params);

	let restaurants;

	if (process.env.NODE_ENV === 'production') {
		restaurants = {
			data: mockData,
		};
	} else {
		try {
			restaurants = await getYelp(params);
		} catch (error) {
			console.error(error);
		}
	}

	const filteredRestaurants = filterRestaurants(restaurants.data.businesses);

	res.json(filteredRestaurants);
});

module.exports = router;
