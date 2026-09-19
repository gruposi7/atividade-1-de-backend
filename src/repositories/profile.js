const { Profile, Project } = require("../models");

async function create(data) {
  return Profile.create(data);
}

async function findById(id) {
  return Profile.findByPk(id, { include: Project });
}

async function findAll() {
  return Profile.findAll({ include: Project, order: [["id", "ASC"]] });
}

module.exports = { create, findById, findAll };
