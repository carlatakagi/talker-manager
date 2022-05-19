const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readFile } = require('./helpers');
const { emailValidation, passwordValidation } = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  try {
    const dataTalker = await readFile('./talker.json');
    response.status(HTTP_OK_STATUS).json(dataTalker);
  } catch (error) {
    return [];
  }
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;

  const dataTalker = await readFile('./talker.json');
  const talker = dataTalker.find((data) => data.id === +id);

  if (!talker) {
    response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }

  response.status(HTTP_OK_STATUS).json(talker);
});

// crypto - explicado no AMA de Node.js no dia 18/05/2022
app.post('/login', emailValidation, passwordValidation, (_request, response) => {
  const generatedToken = crypto.randomBytes(8).toString('hex');

  if (!generatedToken) return response.status(404).json();

  response.status(HTTP_OK_STATUS).json({ token: generatedToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
