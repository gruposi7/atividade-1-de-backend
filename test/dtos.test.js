const test = require("node:test");
const assert = require("node:assert/strict");

const { toProfileInput } = require("../src/dtos/profile");
const { toTechnologyInput } = require("../src/dtos/technology");
const { toProjectInput } = require("../src/dtos/project");
const { toFeedbackInput } = require("../src/dtos/feedback");

test("Profile DTO aceita dados válidos", () => {
  assert.deepEqual(toProfileInput({ name: "Ana", email: "ana@example.com" }), {
    name: "Ana",
    email: "ana@example.com",
    bio: undefined,
    github: undefined
  });
});

test("Profile DTO rejeita email inválido", () => {
  assert.throws(() => toProfileInput({ name: "Ana", email: "invalido" }), /Dados inválidos/);
});

test("Technology DTO rejeita nome vazio", () => {
  assert.throws(() => toTechnologyInput({ name: "" }), /Dados inválidos/);
});

test("Project DTO aceita URL e profileId válidos", () => {
  assert.equal(toProjectInput({
    title: "Projeto",
    description: "Descrição",
    url: "https://example.com",
    profileId: 1
  }).profileId, 1);
});

test("Project DTO rejeita URL inválida", () => {
  assert.throws(() => toProjectInput({
    title: "Projeto",
    description: "Descrição",
    url: "invalida",
    profileId: 1
  }), /Dados inválidos/);
});

  test("Feedback DTO aceita comentário e nota entre 1 e 5", () => {
    assert.deepEqual(toFeedbackInput({ authorName: "Ana", rating: 5, comment: "Ótimo" }, "2"), {
      authorName: "Ana",
      content: "Ótimo",
      rating: 5,
      projectId: 2
    });
  });

  test("Feedback DTO rejeita nota fora do intervalo", () => {
    assert.throws(() => toFeedbackInput({ authorName: "Ana", rating: 6, comment: "Ruim" }, 2), /Dados inválidos/);
  });
