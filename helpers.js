const fs = require('fs/promises');

const readFile = async () => {
  const readTalker = await fs.readFile('talker.json', 'utf8');
  return JSON.parse(readTalker);
};

const writeFile = async (talker) => {
  const writeTalker = await fs.writeFile('talker.json', JSON.stringify(talker));
  return writeTalker;
};
module.exports = {
  readFile,
  writeFile,
};