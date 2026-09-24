const { Project, Profile, Technology, Feedback } = require("../models");
const { Op } = require("sequelize");

async function create(data, technologyIds = []) {
  const project = await Project.create(data);
  if (technologyIds.length > 0) {
    await project.setTechnologies(technologyIds);
  }
  return findById(project.id);
}

async function findById(id, options = {}) {
  return Project.findByPk(id, { ...options, include: [Profile, Technology, Feedback] });
}

async function findAll({ technology, page = 1, limit = 10 } = {}) {
  const technologyWhere = technology ? { name: { [Op.iLike]: `%${technology}%` } } : undefined;

  return Project.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    distinct: true,
    include: [Profile, { model: Technology, where: technologyWhere, required: Boolean(technology) }, Feedback],
    order: [["id", "DESC"]]
  });
}

module.exports = { create, findById, findAll };
