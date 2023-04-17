import mongoose from "mongoose";

const url_connection =
  "mongodb+srv://db_user:GHmn798@cluster0.zmpzx.mongodb.net/?retryWrites=true&w=majority";

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
