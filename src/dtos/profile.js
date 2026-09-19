const { validationError, required } = require("./validation");

function toProfileInput(body) {
  const errors = [
    required(body.name, "Nome é obrigatório"),
    required(body.email, "Email é obrigatório")
  ].filter(Boolean);

  if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push("Email inválido");
  }
  if (errors.length > 0) throw validationError(errors);

  return {
    name: body.name,
    email: body.email,
    bio: body.bio,
    github: body.github
  };
}

function toProfileOutput(profile) {
  return profile ? profile.toJSON() : null;
}

module.exports = { toProfileInput, toProfileOutput };
