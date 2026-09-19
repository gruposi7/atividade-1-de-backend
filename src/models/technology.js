const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Technology = sequelize.define("Technology", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Nome é obrigatório" }
    }
  }
}, {
  tableName: "technologies",
  timestamps: false
});

module.exports = Technology;
