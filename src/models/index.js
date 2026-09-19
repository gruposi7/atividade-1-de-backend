const Profile = require("./profile");
const Project = require("./project");
const Technology = require("./technology");
const Feedback = require("./feedback");
const sequelize = require("../database");

const ProjectTechnology = sequelize.define("ProjectTechnology", {}, {
  tableName: "project_technologies",
  timestamps: false
});

Profile.hasMany(Project, {
  foreignKey: { name: "profileId", allowNull: false },
  onDelete: "CASCADE"
});
Project.belongsTo(Profile, { foreignKey: "profileId" });

Project.belongsToMany(Technology, { through: ProjectTechnology, foreignKey: "projectId" });
Technology.belongsToMany(Project, { through: ProjectTechnology, foreignKey: "technologyId" });

Project.hasMany(Feedback, {
  foreignKey: { name: "projectId", allowNull: false },
  onDelete: "CASCADE"
});
Feedback.belongsTo(Project, { foreignKey: "projectId" });

module.exports = { Profile, Project, Technology, Feedback, ProjectTechnology };
