const test = require("node:test");
const assert = require("node:assert/strict");

const { toProfileInput } = require("../src/dtos/profile");
const { toTechnologyInput } = require("../src/dtos/technology");
const { toProjectInput } = require("../src/dtos/project");

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
