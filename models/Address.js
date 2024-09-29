const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const User = require('./User');

// const Address = sequelize.define('Address', {
//   addressLine1: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   city: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   state: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   postalCode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // One-to-Many relationship between User and Address
// User.hasMany(Address, { foreignKey: 'UserId' });
// Address.belongsTo(User, { foreignKey: 'UserId' });

// module.exports = Address;


