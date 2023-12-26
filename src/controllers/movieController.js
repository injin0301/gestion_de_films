const movieService = require("../services/movieService");
var path = require('path');

// Total elements per page
const pageSize = 2;

const getAllMovies = async (req, res) => {
  try {
    console.log("Get all movies...");

    // Pagination
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const allMovies = await movieService.getAllMovies();

    return res.status(200).send({
      movies: allMovies.slice(startIndex, endIndex),
      // Info for users
      pagination: {
        totalMovies: allMovies.length,
        currentPage: pageNumber,
        totalPage: Math.ceil(allMovies.length / pageSize),
      },
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, error: { code: 404, message: err } });
  }
};

const getOneMovie = async (req, res) => {
  console.log("Get movie by id...");
  const {
    params: { id },
  } = req;
  if (!id) {
    return res.status(400).send("ID not found.");
  }

  try {
    const movie = await movieService.getOneMovie(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "No matching movies found." },
      });
    }
    return res.status(200).send(movie);
  } catch (err) {
    console.error("Failed to retrieve data : ", err);
  }
};

const createNewMovie = async (req, res) => {
  let movieData = JSON.parse(req.body.movie);
  let imageFile = req.files.image;
  if (
    !movieData.name ||
    !movieData.description ||
    !movieData.releasedDate ||
    !movieData.categoryId
  ) {
    return res.status(400).send("Not created.");
  }

  const newMovie = {
    name: movieData.name.toLowerCase(),
    description: movieData.description.toLowerCase(),
    releasedDate: movieData.releasedDate,
    rating: movieData.rating,
    categoryId: movieData.categoryId,
    image: "localhost:3000/api/image/" + imageFile.name,
  };

  let createdMovie;

  try {
    createdMovie = await movieService.createNewMovie(newMovie, imageFile);
    if (!createdMovie) {
      return res.status(400).send("Not created.");
    }
    return res.status(201).send({ status: "OK", data: createdMovie });
  } catch (err) {
    console.error("Failed to retrieve data : ", err);
  }
};

const updateOneMovie = async (req, res) => {
  let movie = req.body;

  const options = {
    where: { id: req.params.id },
  };

  const updatedMovie = await movieService.updateOneMovie(movie, options);
  if (!updatedMovie) {
    return res.status(400).send("Not updated.");
  }
  return res.status(204).send();
};

const deleteOneMovie = async (req, res) => {
  const options = {
    where: { id: req.params.id },
  };

  await movieService.deleteOneMovie(options);
  return res.status(204).send({ status: "OK" });
};

// Pagination
const getMovies = async (req, res) => {
  console.log("Get movies by queries...");
  const query = req.query;

  if (Object.keys(req.query).length === 0) {
    return res.status(400).send("No movie(s) found.");
  }

  try {
    // Pagination
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const movies = await movieService.getMovies(
      query.title,
      query.description,
      query.categoryId
    );

    if (!movies) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "No matching movies found." },
      });
    }

    return res.status(200).send({
      movies: movies.slice(startIndex, endIndex),
      pagination: {
        totalMovies: movies.length,
        currentPage: pageNumber,
        totalPage: Math.ceil(movies.length / pageSize),
      },
    });
  } catch (err) {
    console.error("Failed to retrieve data : ", err);
  }
};

module.exports = {
  getAllMovies,
  getOneMovie,
  getMovies,
  createNewMovie,
  updateOneMovie,
  deleteOneMovie,
};
