const { dropSchema } = require("../database/connexion");
const Category = require("../models/category");

const getAllCategories = async () => {
  let result;
  try {
    result = await Category.findAll();
  } catch (error) {
    console.log(error);
  }
  return result;
};

module.exports = {
  getAllCategories,
};
