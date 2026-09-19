function validationError(messages) {
  const error = new Error("Dados inválidos");
  error.name = "ValidationError";
  error.errors = messages.map(message => ({ message }));
  return error;
}

function required(value, message) {
  return typeof value === "string" && value.trim() ? null : message;
}

module.exports = { validationError, required };
