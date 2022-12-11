const mongoose = require("mongoose");

// Mongoose connect() tells Mongoose which database we want to use
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialnetworkapi",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
