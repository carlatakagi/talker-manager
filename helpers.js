const fs = require('fs').promises;

const readFile = async () => {
  try {
    const dataTalker = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(dataTalker);
  } catch (error) {
    return [];
  }
};

module.exports = {
  readFile,
};