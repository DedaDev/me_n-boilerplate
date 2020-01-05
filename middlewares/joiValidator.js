const joiValidator = (schema, prop) => (req, res, next) => {
  const { error, value } = schema.validate(req[prop]);
  if (!error) {
    req.joi = value;
    res.joi = value;
    next();
  } else {
    const errors = error.details.map((e) => e.message);
    res.status(422).send({ errors });
  }
};

module.exports = {
  bodyValidation: (schema) => joiValidator(schema, 'body'),
  paramsValidation: (schema) => joiValidator(schema, 'params'),
  queryValidation: (schema) => joiValidator(schema, 'query'),
};
