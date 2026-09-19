const { validationError, required } = require("./validation");

function toTechnologyInput(body) {
  const error = required(body.name, "Nome é obrigatório");
  if (error) throw validationError([error]);

  return { name: body.name };
}

function toTechnologyOutput(technology) {
  return technology ? technology.toJSON() : null;
}

module.exports = { toTechnologyInput, toTechnologyOutput };
