import express from "express";
import "./database/db.js"
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import apiRoutes from "./routes/routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3505;

app.use(express.urlencoded({ extended: false }));

// Registering morgan for development purpose
app.use(morgan("dev"));

// Registering Cors
app.use(
  cors({
    origin: "*",
  })
);

// Registering Express.json
app.use(express.json());

// Handle 404 || errors

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
})

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  })
})



// Registering Routes aka All the API's here
app.use("/", apiRoutes);

// Server initialize
app.listen(PORT, () => console.log(`App started running on ${PORT}`));
