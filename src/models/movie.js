const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connexion");

const Movie = sequelize.define("movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releasedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Movie.sync()
  .then(() => {
    console.log("Movie table created successfully!");

    // Defaut data
    Movie.create({
      name: "avatar",
      description: "blue aliens",
      releasedDate: "2021-12-14",
      rating: 3,
      categoryId: 1,
    });

    Movie.create({
      name: "lord of the ring",
      description: "one ring",
      releasedDate: "2003-06-10",
      rating: 5,
      categoryId: 1,
    });

    Movie.create({
      name: "i lov carrot",
      description: "eat carrot",
      releasedDate: "2003-09-18",
      rating: 1,
      categoryId: 3,
    });

    Movie.create({
      name: "scream",
      description: "killer",
      releasedDate: "2007-09-18",
      rating: 4,
      categoryId: 2,
    });

    Movie.create({
      name: "rambo",
      description: "guns guns guns",
      releasedDate: "2012-09-14",
      rating: 5,
      categoryId: 4,
    });

    Movie.create({
      name: "rocky",
      description: "fight on the ring",
      releasedDate: "2006-07-18",
      rating: 5,
      categoryId: 4,
    });

    Movie.create({
      name: "drag me to hell",
      description: "killer",
      releasedDate: "2001-12-18",
      rating: 2,
      categoryId: 2,
    });

    Movie.create({
      name: "it",
      description: "clown",
      releasedDate: "2019-12-18",
      rating: 5,
      categoryId: 2,
    });

    Movie.create({
      name: "it 2",
      description: "clown",
      releasedDate: "2020-12-18",
      rating: 5,
      categoryId: 2,
    });

    Movie.create({
      name: "titanic",
      description: "boat",
      releasedDate: "2000-12-18",
      rating: 5,
      categoryId: 1,
    });

    Movie.create({
      name: "police academy",
      description: "police",
      releasedDate: "1987-12-18",
      rating: 3,
      categoryId: 3,
    });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Movie;
