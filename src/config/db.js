const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://azeezabolaji06:18cZ7LYDbUwxJyu2@cluster0.rhkul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURL)
mongoose.set('debug', true);
mongoose.connection
  .on("open", () => {
    console.log("Database Connected");
  })
  .once("error", () => {
    console.log("Failed to connect to database");
  });

module.exports = mongoose;