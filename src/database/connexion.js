const { Sequelize } = require('sequelize');

// Connect to database temporary
module.exports = new Sequelize('sqlite::memory:')