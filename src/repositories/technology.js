const { Technology } = require("../models");

async function create(data) {
  return Technology.create(data);
}

async function findAll() {
  return Technology.findAll({ order: [["name", "ASC"]] });
}

module.exports = { create, findAll };
