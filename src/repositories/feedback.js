const { Feedback } = require("../models");

async function create(data) {
  return Feedback.create(data);
}

module.exports = { create };
