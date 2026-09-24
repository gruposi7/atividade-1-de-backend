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
  },
  upvotes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: "Curtidas não podem ser negativas" }
    }
  },
  averageRating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: "Média mínima é 0" },
      max: { args: [5], msg: "Média máxima é 5" }
    }
  }
}, {
  tableName: "projects",
  timestamps: false
});

module.exports = Project;
