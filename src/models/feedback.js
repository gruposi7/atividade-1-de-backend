const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Feedback = sequelize.define("Feedback", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Nome do autor é obrigatório" }
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Opinião é obrigatória" }
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1], msg: "Nota mínima é 1" },
      max: { args: [5], msg: "Nota máxima é 5" }
    }
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "feedbacks",
  timestamps: true
});

module.exports = Feedback;
