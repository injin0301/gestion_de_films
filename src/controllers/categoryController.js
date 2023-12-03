const categoryService = require("../services/categoryService");

const getAllCategories = async (req, res) => {
  try {
    console.log("Get all categories...");
    const allCategories = await categoryService.getAllCategories();
    res.status(200).send(allCategories);
  } catch (err) {
    res
      .status(404)
      .json({ success: false, error: { code: 404, message: err } });
  }
};

module.exports = {
  getAllCategories,
};
