const { Project, Profile, Technology, Feedback } = require("../models");

async function create(data, technologyIds = []) {
  const project = await Project.create(data);
  if (technologyIds.length > 0) {
    await project.setTechnologies(technologyIds);
  }
  return findById(project.id);
}

async function findById(id) {
  return Project.findByPk(id, { include: [Profile, Technology, Feedback] });
}

async function findAll() {
  return Project.findAll({
    include: [Profile, Technology, Feedback],
    order: [["id", "DESC"]]
  });
}

module.exports = { create, findById, findAll };
