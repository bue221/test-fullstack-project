import mongoose from "mongoose";

const url_connection = process.env.MONGODB_URI;
// connect to the database
mongoose
  .connect(url_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
