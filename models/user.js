const {Sequelize, DataTypes} = require ('sequelize-cockroachdb');
const db = require('../util/database');

const User = db.define('user', {
    // Model attributes are defined here
    id: { 
      // Sequelize will assume your primary key is named id unless otherwise specified
      // Sequelize will automatically create an id attribute that's the primary key if not specified, but it defaults to an auto-incrementing integer.
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // Sequelize will automatically add the attributes createdAt and updatedAt to your model
  }, {
    // Other model options go here
    paranoid: true,
  })
  
module.exports = User;