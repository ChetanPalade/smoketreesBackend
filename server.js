const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const Address = require('./models/Address');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// POST route to register a user and their addresses
app.post('/register', async (req, res) => {
  const { name, addresses } = req.body;

  try {
    // Create the user
    const user = new User({ name });
    await user.save();

    // Create addresses and associate them with the user
    const userAddresses = await Promise.all(
      addresses.map(async (address) => {
        const newAddress = new Address({
          ...address,
          user: user._id,
        });
        await newAddress.save();
        return newAddress;
      })
    );

    // Update user with the addresses
    user.addresses = userAddresses.map((address) => address._id);
    await user.save();

    res.status(201).json({ user, addresses: userAddresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch users and their addresses
app.get('/users', async (req, res) => {
    try {
      const users = await User.find().populate('addresses').exec(); // Fetch users and populate addresses
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const sequelize = require('./db');
// const User = require('./models/User');
// const Address = require('./models/Address');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // POST route for user registration and address
// app.post('/register', async (req, res) => {
//   const { name, addresses } = req.body;

//   try {
//     const user = await User.create({ name });
//     const userAddresses = await Address.bulkCreate(
//       addresses.map((address) => ({ ...address, UserId: user.id }))
//     );
//     res.status(201).json({ user, addresses: userAddresses });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Sync the database and start the server
// sequelize.sync({ force: true }).then(() => {
//   app.listen(3001, () => {
//     console.log('Server is running on http://localhost:3001');
//   });
// });


