const express = require("express");
const router = express.Router();
const profileRepository = require("../repositories/profile");
const { toProfileInput, toProfileOutput } = require("../dtos/profile");


router.post("/", async (req, res) => {
  try {
    const profile = await profileRepository.create(toProfileInput(req.body));
    res.status(201).json(toProfileOutput(profile));
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: err.errors.map(error => error.message) });
    }
    res.status(500).json({ error: "Erro ao criar perfil" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const profile = await profileRepository.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: "Perfil não encontrado" });
    }

    res.json(toProfileOutput(profile));
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
});


router.get("/", async (req, res) => {
  try {
    const profiles = await profileRepository.findAll();
    res.json(profiles.map(toProfileOutput));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
