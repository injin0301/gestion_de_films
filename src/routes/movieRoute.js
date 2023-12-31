const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const { authenticate, beSureUserIsAdmin } = require('../middlewares/middleware');

router.get("/all", movieController.getAllMovies);

// Research
// Order important (avoid a conflict with /:id)
router.get("/", movieController.getMovies);

router.get("/:id", movieController.getOneMovie);

router.post("/", authenticate, beSureUserIsAdmin, movieController.createNewMovie);

router.put("/:id", authenticate, beSureUserIsAdmin, movieController.updateOneMovie);

router.delete("/:id", authenticate, beSureUserIsAdmin, movieController.deleteOneMovie);

module.exports = router;
