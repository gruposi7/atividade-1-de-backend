const { fn, col } = require("sequelize");
const sequelize = require("../database");
const { Project, Feedback } = require("../models");
const projectRepository = require("../repositories/project");
const feedbackRepository = require("../repositories/feedback");
const { NotFoundError } = require("../errors");

async function createFeedback(projectId, data) {
  return sequelize.transaction(async transaction => {
    const project = await Project.findByPk(projectId, { transaction, lock: transaction.LOCK.UPDATE });
    if (!project) throw new NotFoundError("Projeto não encontrado");

    await feedbackRepository.create(data, { transaction });
    const result = await Feedback.findOne({
      attributes: [[fn("AVG", col("rating")), "averageRating"]],
      where: { projectId },
      raw: true,
      transaction
    });
    const averageRating = Number(Number(result.averageRating).toFixed(2));
    await project.update({ averageRating }, { transaction });

    return projectRepository.findById(projectId, { transaction });
  });
}

async function upvote(projectId) {
  return sequelize.transaction(async transaction => {
    const project = await Project.findByPk(projectId, { transaction, lock: transaction.LOCK.UPDATE });
    if (!project) throw new NotFoundError("Projeto não encontrado");

    await project.increment("upvotes", { by: 1, transaction });
    return projectRepository.findById(projectId, { transaction });
  });
}

async function listProjects(filters) {
  return projectRepository.findAll(filters);
}

module.exports = { createFeedback, upvote, listProjects };