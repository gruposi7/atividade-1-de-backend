const express = require("express");
const projectRepository = require("../repositories/project");
const { toProjectInput, toProjectOutput } = require("../dtos/project");

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
    const projects = await projectRepository.findAll();
    res.json(projects.map(toProjectOutput));
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar projetos" });
  }
});

module.exports = router;
