const {Sequelize, DataTypes} = require("sequelize-cockroachdb");
// Connect to CockroachDB through Sequelize.
const process = require('process');
require('dotenv').config();
const connectionString = process.env.DATABASE_URL
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "boothpeople-back-ccsequelize"
  },
  //  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  logging:  console.log, // Default, displays the first parameter of the log function call


});

module.exports = sequelize; //export sequelize for use in other files