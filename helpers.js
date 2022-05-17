const fs = require('fs');

const readFile = async (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

module.exports = {
  readFile,
};