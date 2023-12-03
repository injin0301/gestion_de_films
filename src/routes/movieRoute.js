const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");


router.get("/all", movieController.getAllMovies);

// Research
// Order important (avoid a conflict with /:id)
router.get("/", movieController.getMovies);

router.get("/:id", movieController.getOneMovie);

router.post("/", movieController.createNewMovie);

router.put("/:id", movieController.updateOneMovie);

router.delete("/:id", movieController.deleteOneMovie);

module.exports = router;
