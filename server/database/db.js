import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to Database!"))
  .catch((err) => console.error("Error", err));
