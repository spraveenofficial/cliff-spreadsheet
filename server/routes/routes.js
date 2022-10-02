import { Router } from "express";

const app = Router();

app.get("/req", (req, res) => res.json("ok"));

export default app;
