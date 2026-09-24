const { Feedback } = require("../models");

async function create(data, options = {}) {
  return Feedback.create(data, options);
}

module.exports = { create };
