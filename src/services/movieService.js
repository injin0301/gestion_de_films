const { Op } = require("sequelize");
const Movie = require("../models/movie");
const Category = require("../models/category");

const getAllMovies = async () => {
  let result;
  try {
    result = await Movie.findAll();
  } catch (error) {
    console.log(error);
  }
  return result;
};

const getOneMovie = async (id) => {
  let result;
  try {
    result = await Movie.findByPk(id);
  } catch (error) {
    console.log(error);
  }
  return result;
};

// Pagination
const getMovies = async (title, movieDescription, movieCategoryId) => {
  let result;
  // Three arguments are optional
  let name = title ? { name: title.toLowerCase() } : undefined;
  let description = movieDescription
    ? { description: movieDescription.toLowerCase() }
    : undefined;
  let categoryId = movieCategoryId
    ? { categoryId: movieCategoryId }
    : undefined;

  try {
    result = await Movie.findAll({
      where: {
        [Op.or]: [name, description, categoryId], // Optional
      },
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

const createNewMovie = async (newMovie) => {
  let savedMovie;
  let category;
  try {
    category = await Category.findByPk(newMovie.categoryId);

    // Check first, If categoryId is exist
    if (!category) {
      console.log("Category not exist.");
      return;
    }

    savedMovie = await Movie.create(newMovie);
  } catch (error) {
    console.log(error);
  }
  return savedMovie;
};

const updateOneMovie = async (movie, options) => {
  let updatedMovie;
  let category;
  try {
    // Only if user update a category Id
    if (movie.categoryId) {
      category = await Category.findByPk(movie.categoryId);

      // Check first, If categoryId is exist
      if (!category) {
        console.log("Category not exist.");
        return;
      }
    }

    updatedMovie = await Movie.update(movie, options);
  } catch (error) {
    console.log(error);
  }

  return updatedMovie;
};

const deleteOneMovie = async (options) => {
  await Movie.destroy(options);
};

module.exports = {
  getAllMovies,
  getOneMovie,
  getMovies,
  createNewMovie,
  updateOneMovie,
  deleteOneMovie,
};
