const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Nome é obrigatório" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Email inválido" }
    }
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "profiles",
  timestamps: false
});

module.exports = Profile;
