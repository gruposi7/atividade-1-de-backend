const { validationError, required } = require("./validation");

function toFeedbackInput(body, projectId) {
  const content = body.comment ?? body.content;
  const errors = [
    required(body.authorName, "Nome do autor é obrigatório"),
    required(content, "Comentário é obrigatório"),
    Number.isInteger(body.rating) && body.rating >= 1 && body.rating <= 5
      ? null
      : "Nota deve ser um número inteiro entre 1 e 5"
  ].filter(Boolean);

  if (errors.length > 0) throw validationError(errors);

  return { authorName: body.authorName, content, rating: body.rating, projectId: Number(projectId) };
}

module.exports = { toFeedbackInput };