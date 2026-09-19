const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Título é obrigatório" }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Descrição é obrigatória" }
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: "URL inválida" }
    }
  },
  profileId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "projects",
  timestamps: false
});

module.exports = Project;
