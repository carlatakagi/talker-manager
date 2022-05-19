const emailValidation = (request, response, next) => {
  const { email } = request.body;
  const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  const regexEmail = regex.test(email);

  if (email === undefined || email === '') {
    return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidation = (request, response, next) => {
  const { password } = request.body;

  if (password === undefined || password === '') {
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

module.exports = {
  emailValidation,
  passwordValidation,
};