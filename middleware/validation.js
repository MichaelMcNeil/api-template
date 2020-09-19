const Joi = require("joi");

module.exports = (schema) => (req, res, next) => {
  const joiSchema = Joi.object(schema);
  const result = joiSchema.validate(req.body);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  next();
};
