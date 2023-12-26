const categoryService = require("../services/categoryService");

const getAllCategories = async (req, res) => {
  try {
    console.log("Get all categories...");
    const allCategories = await categoryService.getAllCategories();
    return res.status(200).send(allCategories);
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, error: { code: 404, message: err } });
  }
};

module.exports = {
  getAllCategories,
};
