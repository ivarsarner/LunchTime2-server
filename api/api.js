const axios = require('axios');

const getYelp = async ({ category, latitude, longitude }) => {
	const baseUrl = 'https://api.yelp.com/v3/businesses/search?';
	const apiKey = process.env.YELP_APIKEY;
	const query = `term=restaurants&categories=${category}&latitude=${latitude}&longitude=${longitude}&sort_by=distance`;
	const url = baseUrl + query;
	const options = { headers: { Authorization: `Bearer ${apiKey}` } };
	try {
		const response = await axios.get(url, options);
		return response;
	} catch (error) {
		console.log('Error when requesting to Yelp:');
		console.error(error);
	}
};

module.exports = getYelp;
