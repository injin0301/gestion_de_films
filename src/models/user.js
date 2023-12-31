const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connexion");
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
  uid: {
    type: Sequelize.UUID,
    defaultValue : Sequelize.UUIDV4,
    primaryKey: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

User.sync()
  .then(async () => {
    console.log("User table created successfully!");

    hashPassword = await bcrypt.hashSync("qwerty1234", 8);

    // Defaut data
    User.create({
      uid: "b50ab759-fc35-44a3-9323-7021d246fea4",
      login: "ikim",
      password: hashPassword,
      roles: "ROLE_ADMIN",
      status: "open",
    });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = User;
