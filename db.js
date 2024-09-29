// const { Sequelize } = require('sequelize');

// // SQLite Database setup
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite', 
// });

// module.exports = sequelize;


const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://cwpalade97:chetanp189@cluster0.tvg58.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    });
    console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);  
    }
};

module.exports = connectDB