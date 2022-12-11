// import Express and Mongoose
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// Mongoose connect() tells Mongoose which database we want to use
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:3001/socialnetworkapi",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
