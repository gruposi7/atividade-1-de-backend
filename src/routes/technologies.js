const express = require("express");
const technologyRepository = require("../repositories/technology");
const { toTechnologyInput, toTechnologyOutput } = require("../dtos/technology");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const technology = await technologyRepository.create(toTechnologyInput(req.body));
    res.status(201).json(toTechnologyOutput(technology));
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: err.errors.map(error => error.message) });
    }
    res.status(500).json({ error: "Erro ao criar tecnologia" });
  }
});

router.get("/", async (req, res) => {
  try {
    const technologies = await technologyRepository.findAll();
    res.json(technologies.map(toTechnologyOutput));
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar tecnologias" });
  }
});

module.exports = router;
