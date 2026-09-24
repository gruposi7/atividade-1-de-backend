const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "DevShowcase API",
    version: "1.0.0",
    description: "API para projetos, tecnologias, curtidas e avaliações do DevShowcase."
  },
  servers: [{ url: "/" }],
  paths: {
    "/api/projects": {
      get: {
        summary: "Lista projetos com filtro e paginação",
        parameters: [
          { name: "technology", in: "query", schema: { type: "string" } },
          { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 100, default: 10 } }
        ],
        responses: { 200: { description: "Projetos paginados" }, 400: { description: "Parâmetros inválidos" } }
      }
    },
    "/api/projects/{id}/feedbacks": {
      post: {
        summary: "Adiciona uma avaliação e recalcula a média do projeto",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/FeedbackInput" } } } },
        responses: { 201: { description: "Avaliação criada" }, 400: { description: "Dados inválidos" }, 404: { description: "Projeto não encontrado" } }
      }
    },
    "/api/projects/{id}/upvote": {
      put: {
        summary: "Incrementa as curtidas do projeto",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Curtida registrada" }, 404: { description: "Projeto não encontrado" } }
      }
    }
  },
  components: {
    schemas: {
      FeedbackInput: {
        type: "object",
        required: ["authorName", "rating", "comment"],
        properties: {
          authorName: { type: "string", example: "Ana" },
          rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
          comment: { type: "string", example: "Excelente projeto!" }
        }
      }
    }
  }
};

module.exports = swaggerDocument;