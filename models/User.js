const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;


