const mongoose = require('mongoose');
const env = require('dotenv').config();

const connectDB = async () => {
    mongoose.connect(process.env.DB_STRING);
    console.log("MongoDB connected");
}

module.exports = connectDB;