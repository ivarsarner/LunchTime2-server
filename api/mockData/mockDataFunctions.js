const fs = require('fs');
const util = require('util');
const path = require('path');

const dataPath = path.join(__dirname, 'mockData.json');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const saveMockData = async (data) =>
	await writeFile(dataPath, JSON.stringify(data, null, 2));

const readMockData = async () => await readFile(dataPath, 'utf8');

module.exports = {
	saveMockData,
	readMockData,
};
