
const mongoose = require("mongoose");

require('dotenv').config();

const URI = process.env.MONGODB_URI;

if (!URI) {
    console.error("MONGODB_URI environment variable not set");
    process.exit(1);
}

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);  // Use 1 to indicate an error during startup
    }
};

module.exports = connectDb;
