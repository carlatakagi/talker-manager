// regex https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const emailValidation = (request, response, next) => {
  const { email } = request.body;
  const regex = /\S+@\S+\.\S+/;
  const regexEmail = regex.test(email);

  if (!email) {
    return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (request, response, next) => {
  const { password } = request.body;

  if (!password) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  
  if (password.length < 6) {
    return response.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16) {
    return response.status(401).send({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (request, response, next) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (request, response, next) => {
  const { age } = request.body;

  if (!age) {
    return response.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidation = (request, response, next) => {
  const { talk } = request.body;

  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return response.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
    
  next();
};

const watchedAtValidation = (request, response, next) => {
  const { talk } = request.body;

  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  const regexDateTest = regexDate.test(talk.watchedAt);
  
  if (!regexDateTest || regexDateTest === '') {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  next();
};

const rateValidation = (request, response, next) => {
  const { talk } = request.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};