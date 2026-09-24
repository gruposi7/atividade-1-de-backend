const express = require("express");
const projectRepository = require("../repositories/project");
const projectService = require("../services/project");
const { toProjectInput, toProjectOutput } = require("../dtos/project");
const { toFeedbackInput } = require("../dtos/feedback");
const { BadRequestError } = require("../errors");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { technologyIds = [] } = req.body;
    const project = await projectRepository.create(toProjectInput(req.body), technologyIds);
    res.status(201).json(toProjectOutput(project));
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors.map(error => error.message) });
    }
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new BadRequestError("page deve ser >= 1 e limit deve estar entre 1 e 100");
    }

    const result = await projectService.listProjects({ page, limit, technology: req.query.technology });
    res.json({
      data: result.rows.map(toProjectOutput),
      pagination: { page, limit, total: result.count, totalPages: Math.ceil(result.count / limit) }
    });
  } catch (err) {
    throw err;
  }
});

router.post("/:id/feedbacks", async (req, res) => {
  if (!/^\d+$/.test(req.params.id) || Number(req.params.id) < 1) {
    throw new BadRequestError("ID do projeto inválido");
  }
  const project = await projectService.createFeedback(
    Number(req.params.id),
    toFeedbackInput(req.body, req.params.id)
  );
  res.status(201).json(toProjectOutput(project));
});

router.put("/:id/upvote", async (req, res) => {
  if (!/^\d+$/.test(req.params.id) || Number(req.params.id) < 1) {
    throw new BadRequestError("ID do projeto inválido");
  }
  const project = await projectService.upvote(Number(req.params.id));
  res.json(toProjectOutput(project));
});

module.exports = router;
