const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Error conectando MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
