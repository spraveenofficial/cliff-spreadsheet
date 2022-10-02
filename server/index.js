import express from "express";
import "./database/db.js"
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import AuthRoutes from "./routes/auth-routes.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));

// Registering morgan for development
app.use(morgan("dev"));

// Registering Cors
app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());


const PORT = process.env.PORT || 3505;

// Registering Routes
app.use("/v1/api/auth", AuthRoutes);


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

// Server initialize
app.listen(PORT, () => console.log(`App started running on ${PORT}`));
