const { validationError, required } = require("./validation");

function toProjectInput(body) {
  const errors = [
    required(body.title, "Título é obrigatório"),
    required(body.description, "Descrição é obrigatória"),
    required(body.url, "URL é obrigatória"),
    Number.isInteger(body.profileId) && body.profileId > 0 ? null : "profileId é obrigatório"
  ].filter(Boolean);

  if (body.url) {
    try {
      new URL(body.url);
    } catch {
      errors.push("URL inválida");
    }
  }
  if (errors.length > 0) throw validationError(errors);

  return {
    title: body.title,
    description: body.description,
    url: body.url,
    profileId: body.profileId
  };
}

function toProjectOutput(project) {
  return project ? project.toJSON() : null;
}

module.exports = { toProjectInput, toProjectOutput };
