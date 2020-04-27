const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		message:
			'Hello, this is the home route, use /restaurants/latitude/longitude/category for restaurants',
	});
});

module.exports = router;
