const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connexion");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.sync()
  .then(() => {
    console.log("Categoy table created successfully!");

    // Defaut data
    Category.create({
      name: "fantasy",
    });

    Category.create({
      name: "horror",
    });

    Category.create({
      name: "comedy",
    });

    Category.create({
      name: "action",
    });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Category;
